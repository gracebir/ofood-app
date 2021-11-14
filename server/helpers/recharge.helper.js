import User from "../model/user.js";
import Client from "../model/client.js";
import Operation from "../model/operation.js";
import Categorie from "../model/categorie.js";
import onConnexion from "../services/connexion.js";
import dotenv, { parse } from 'dotenv';
import dateFormat from "dateformat";
import Debit from "../model/debit.js";
import Card from "../model/card.js";

dotenv.config();
/*
    await _checkpayement({
        clientsolde: client.solde,
        categorie: _category,
        priceformclient: _priceformclient ? _priceformclient : undefined
    }, (ret) => {
        // console.log(ret);
        switch (parseInt(ret)) {
            case 1:
                cb({
                    status: 409,
                    message: "solde insuffisant client",
                    data: {
                        currentsolde: client.solde,
                        neededsolde: _montant
                    }
                }, undefined)
                break;
            case 2:
            cb({
                status: 500,
                message: "Une erreur vient de se produire sur le serveur !",
                data: {
                    currentsolde: client.solde,
                    neededsolde: _priceformclient
                }
            }, undefined)
            break;
            case 0:
            Operation.create({
                ispending: 1,
                montant: _priceformclient,
                // idreceiver: _agent,
                idsender: _client,
                datastatus: process.env.DB_DATASTATUS,
                createdon: dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT"),
                createby: _client,
                modifiedby: 0,
                deletedby: 0,
                validatedeon: "waiting for"
            })
            .then(resolved => {
                if(resolved instanceof Operation){
                    cb(undefined,{
                        status: 200,
                        message: "effectué avec succès",
                        data: {
                            idoperation: resolved.id,
                            currentsolde: client.solde,
                            type: _category,
                            priceformclient: _priceformclient
                        }
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
            // transaction.commit();
            break;
            default:
                cb({
                    status: 500,
                    message: "une erreur vient de se produire !",
                    data: {
                        currentsolde: client.solde,
                        neededsolde: _montant
                    }
                }, undefined) 
            break;
        }
    })
*/
const _checkpayement = async (data, cb) => {
    /**
     * 0 : means can pay
     * 1 : solde enougth
     * 2 : error on execution
     * how to calculate retrocommission
     * get 15% if price of trans if >= 1000
     */
    const { clientsolde, categorie, priceformclient } = data;
    await Categorie.findOne({
        where: {
            categorie: categorie,
            datastatus: process.env.DB_DATASTATUS
        }
    })
    .then(categ => {
        if(categ instanceof Categorie){ 
            if(categ.categorie === 'taxi-m'){
                if(parseInt(clientsolde) >= priceformclient) cb(0)
                else cb(1)
            } else {
                if(parseInt(clientsolde) >= parseInt(categ.staticprice)) cb(0)
                else cb(1)
            }
        } else cb(2)
    })
    .catch(err => {
        cb(2);
    })
};
const _checkpayementclient = async (data, cb) => {
    // const transaction = await onConnexion.transaction();
    /**
     * 0 : means can pay
     * 1 : solde enougth
     * 2 : error on execution
     * how to calculate retrocommission
     * get 15% if price of trans if >= 1000
     */
    const { clientsolde, categorie, priceformclient, idclient, idagent, idoperation } = data;
    await Operation.findOne({
        where: {
            id: idoperation,
            datastatus: process.env.DB_DATASTATUS,
            ispending: process.env.DB_DATASTATUS
        }
    })
    .then(ope => {
        if(ope instanceof Operation){
           Debit.create({
                idclient: idclient,
                idagent: idagent,
                idoperation: idoperation,
                retrocommission: parseInt(priceformclient) * parseFloat(process.env.RETROCOMMISION),
                createdon: dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT")
            })
            .then(debit => {
                ope.update({
                    ispending: process.env.DB_UNACTIVE
                })
                // debit.update({})
                // transaction.commit()
                if(debit instanceof Debit) cb({ret: parseFloat(debit.retrocommission), sts: 0})
                else cb({ret: null, sts: 2})
            })
            .catch(er => {
                // console.log(er);
                // transaction.rollback()
                cb({ret: null, sts: 2})
            })
        }else {
            // transaction.rollback()
            cb({ret: null, sts: 2});
        }
    })
    .catch(err => {
        // console.log(err);
        // transaction.rollback();
        cb({ret: null, sts: 2});
    })
};
const onAddRechargeEndPoint = async (data, cb) => {
    let {_agent, _montant, _ms_key, _idcard, type} = data;
    try {
        const transaction = await onConnexion.transaction();
        await User.findOne({
            where: {
                id_: _ms_key,
                id: _agent
            }
        })
        .then(user => {
            if(user instanceof User){
                if(user.solde >= parseFloat(_montant)){
                    user.update({
                        solde: parseFloat(user.solde) - parseFloat(_montant) 
                    }, {transaction})
                    let card = null; 
                    if(_idcard !== "none"){
                        Card.findOne({
                            where: {
                                id_: _idcard,
                                datastatus: process.env.DB_DATASTATUS
                            }
                        })
                        .then(cr => {
                            if(cr instanceof Card){
                                card = cr;
                                cr.update({
                                    solde: parseFloat( cr['solde']) + parseFloat(_montant)
                                }, {transaction})

                            } else {
                                cb({
                                    status: 404,
                                    message: "le numero de la carte entré est incorrect | ou n'est encore activée",
                                    data: {}
                                }, undefined) 
                                // transaction.rollback()
                                return false;
                            }
                        })
                        .catch(err => {
                            cb({
                                status: 404,
                                message: "le numero de la carte entré est incorrect",
                                data: {}
                            }, undefined) 
                            // transaction.rollback()
                            return false;
                        })
                    }
                    Operation.create({
                        ispending: _idcard === "none" ? process.env.DB_DATASTATUS : process.env.DB_UNACTIVE,
                        montant: parseInt(_montant),
                        // idreceiver: card.id,
                        idsender: _agent,
                        datastatus: process.env.DB_DATASTATUS,
                        createdon: dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT"),
                        createby: _agent,
                        modifiedby: 0,
                        deletedby: 0,
                        validatedeon: _idcard === "none" ? "waiting for" : dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT")
                    }, {transaction})
                    .then(oper => {
                        if(oper instanceof Operation){
                            if(card !== null){
                                if(card.isassociated === parseInt(process.env.DB_DATASTATUS)){
                                    Client.findOne({
                                        where: {
                                            idcard: _idcard
                                        }
                                    })
                                    .then(cl => {
                                        if(cl instanceof Client){
                                            cl.update({
                                                solde: parseFloat(cl.solde) + parseFloat(_montant)
                                            }, {transaction})
                                        }
                                    })
                                }
                            }
                            transaction.commit();
                            cb(undefined, {
                                status: 200,
                                message: "Opération effectuée avec succès",
                                data: {
                                    idme: user['id'],
                                    io: oper['id'],
                                    agentname: `${user['fsname']} - ${user['lsname']}`,
                                    agentid: user['id_'],
                                    clientid: _idcard !== "none" && card ? card['id_'] : "MS Card",
                                    clientname: "MS Card | For Client",
                                    newsolde: user.solde,
                                    montantoperation: _montant,
                                    operationid: `MS-OP-${oper['id']}`,
                                    createdon: dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT"),
                                    ispending: 0,
                                    type: 'Transfert',
                                    status: 'succes'
                                }
                            })
                        }
                    })
                    .catch(er => {
                        console.log(er)
                        // transaction.rollback()
                        cb({
                            status: 500,
                            message: "une erreur serveur vient de se produire",
                            data: {}
                        }, undefined)
                    })
                }else {
                    cb({
                        status: 409,
                        message: "Votre solde est insuffisant",
                        data: {}
                    }, undefined) 
                    // transaction.rollback()
                } 
            }else {
                cb({
                    status: 404,
                    message: "le numero agent est incorrect | ou n'existe pas",
                    data: {}
                }, undefined) 
                // transaction.rollback()
            } 
        })
        .catch(err => {
            transaction.rollback()
            console.log(err);
            cb({
                status: 500,
                message: "Une erreur serveur vient de produire",
                data: {}
            }, undefined)   
        })
    } catch (error) {
        console.log(error)
        transaction.rollback()
        cb({
            status: 500,
            message: "une erreur serveur vient de se produire",
            data: {}
        }, undefined)
    }
};
const onRechargeClient = async (data, cb) => {
    const {_agent, _montant, _ms_key, _client, _ms_client_key, io } = data;
    const transaction = await onConnexion.transaction();
    let now = new Date();
    try {
        const operation = await Operation.findOne({where:{
            // idsender: _agent,
            // idreceiver: _client,
            id: io,
            datastatus: process.env.DB_DATASTATUS,
            ispending: process.env.DB_DATASTATUS
        }}, { transaction: transaction });

        if(operation instanceof Operation){
            operation.update({
                ispending: 0,
                validatedeon: dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT")
            })
            const client = await Client.findOne({where: {
                id: _client,
                datastatus: process.env.DB_DATASTATUS,
                id_: _ms_client_key
            }})
            if(client instanceof Client){
                client.update({
                    solde: client.solde + _montant
                },{transaction})
                const user = await User.findOne({where:{
                    id: _agent,
                    id_: _ms_key,
                    datastatus: process.env.DB_DATASTATUS
                }})
                if(user instanceof User){
                    user.update({
                        solde: user.solde - _montant
                    }, {transaction})
                    cb(undefined, {
                        status: 200,
                        message: "Opération effectuée avec succès",
                        data: {
                            operationid : `MS-OPER-${operation.id}`,
                            agentname: `${user.fsname} - ${user.lsname}`,
                            clientname: `${client.fsname} - ${client.lsname}`,
                            clientid: _ms_client_key,
                            agentid : _ms_key,
                            newsolde : client.solde,
                            depsolde: _montant,
                            status: "success",
                            type: "recharge",
                            validatedeon: dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT"),
                            createdon: operation.createdon
                        }
                    })
                    transaction.commit();
                }else{ cb({
                    status: 407,
                    message: "Votre compte n'est pas encore activé !",
                    data: {
                        operationid : `MS-OPER-${operation.id}`,
                        agentname: `${user.fsname} - ${user.lsname}`,
                        clientname: `${client.fsname} - ${client.lsname}`,
                        clientid: _ms_client_key,
                        agentid : _ms_key,
                        newsolde : client.solde,
                        depsolde: _montant,
                        status: "success",
                        type: "recharge",
                        validatedeon: dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT"),
                        createdon: operation.createdon
                    }
                }, undefined)
                transaction.rollback();
            }
            }else{ cb({
                status: 407,
                message: "Agent n'est pas activé dans le système !",
                data: {
                    operationid : `MS-OPER-${operation.id}`,
                    agentname: `${user.fsname} - ${user.lsname}`,
                    clientname: `${client.fsname} - ${client.lsname}`,
                    clientid: _ms_client_key,
                    agentid : _ms_key,
                    newsolde : client.solde,
                    depsolde: _montant,
                    status: "success",
                    type: "recharge",
                    validatedeon: dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT"),
                    createdon: operation.createdon
                }
            }, undefined)
            transaction.rollback();
            }
        }else{ cb({
            status: 401,
            message: "QRCode Invalide ou déjà utilisé Désolé !",
            data: {
                operationid : `MS-OPER-${operation ? operation.id : new Date().getMilliseconds()}`,
                agentname: 'MS Agent',
                clientname: `MS Agent`,
                clientid: _ms_client_key,
                agentid : _ms_key,
                newsolde : "---",
                depsolde: _montant,
                status: "échec | QRCode Invalide ou déjà utilisé Désolé !",
                type: "recharge",
                validatedeon: dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT"),
                createdon: dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT")
            }
        }, undefined)
        transaction.rollback();
        }
      } catch(err) {
            cb({
                status: 500,
                message: "une erreur serveur vient de se produire !",
                data: {
                    operationid : `MS-OPER-${new Date().getMilliseconds()}`,
                    agentname: 'MS Agent',
                    clientname: `MS Agent`,
                    clientid: _ms_client_key,
                    agentid : _ms_key,
                    newsolde : "---",
                    depsolde: _montant,
                    status: "échec | QRCode Invalide ou déjà utilisé Désolé !",
                    type: "recharge",
                    validatedeon: dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT"),
                    createdon: dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT")
                }
            }, undefined);
            await transaction.rollback();
      }
};
const onPayingCaseClient = async (data, cb) => {
    const {_agent, _montant, _ms_key, _client, _ms_client_key, _category, _priceformclient } = data;
    const transaction = onConnexion.transaction();
    try {
       const client = await Client.findOne({
           where:{
            id: _client,
            datastatus: process.env.DB_DATASTATUS,
            id_: _ms_client_key
        }
       }, { transaction: transaction });
       if(client instanceof Client){
        await _checkpayement({
            clientsolde: client.solde,
            categorie: _category,
            priceformclient: _priceformclient ? parseInt(_priceformclient) : undefined
            }, (ret) => {
            // console.log(ret);
            switch (parseInt(ret)) {
                case 1:
                    cb({
                        status: 409,
                        message: "solde insuffisant client",
                        data: {
                            currentsolde: client.solde,
                            neededsolde: _montant
                        }
                    }, undefined)
                    break;
                case 2:
                cb({
                    status: 500,
                    message: "Une erreur vient de se produire sur le serveur !",
                    data: {
                        currentsolde: client.solde,
                        neededsolde: _priceformclient
                    }
                }, undefined)
                break;
                case 0:
                Operation.create({
                    ispending: 1,
                    montant: _priceformclient,
                    // idreceiver: _agent,
                    idsender: _client,
                    datastatus: process.env.DB_DATASTATUS,
                    createdon: dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT"),
                    createby: _client,
                    modifiedby: 0,
                    deletedby: 0,
                    validatedeon: "waiting for"
                })
                .then(resolved => {
                    if(resolved instanceof Operation){
                        cb(undefined,{
                            status: 200,
                            message: "effectué avec succès",
                            data: {
                                idoperation: resolved.id,
                                currentsolde: client.solde,
                                type: _category,
                                priceformclient: _priceformclient
                            }
                        })
                    }
                })
                .catch(error => {
                    console.log(error)
                })
                // transaction.commit();
                break;
                default:
                    cb({
                        status: 500,
                        message: "une erreur vient de se produire !",
                        data: {
                            currentsolde: client.solde,
                            neededsolde: _montant
                        }
                    }, undefined) 
                break;
            }
        })
       }else cb({
           status: 401,
           message: "client n'existe pas dans la base de données Ou non activé"
       })
    } catch (error) {
        cb({
            status: 500,
            message: "une erreur serveur vient de se produire",
            data: error
        }, undefined)
    }
};
const checkifdoneoperation = async (data, cb) => {
    try {
        await Operation.findOne({
            where:{
                id: parseInt(data['io'])
            }
        })
        .then(ope => {
            if(ope instanceof Operation){
                if(ope.ispending === 0){
                    Client.findOne({
                        where: {
                            id: parseInt(ope.idsender),
                            datastatus: process.env.DB_DATASTATUS
                        }
                    })
                    .then(cl => {
                        if(cl instanceof Client){

                            cb(undefined, {
                                status: 200,
                                message: "operation effectée avec succès",
                                data:{
                                    idc: cl.id,
                                    operationid : `MS-OPER-${ope.id}`,
                                    agentname: "MS Agent",
                                    clientname: `${cl.fsname} - ${cl.lsname}`,
                                    clientid: cl.id_,
                                    agentid : "---",
                                    newsolde : cl.solde,
                                    depsolde: ope.montant,
                                    status: "success",
                                    type: "Paiement",
                                    validatedeon: dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT"),
                                    createdon: ope.createdon
                                }
                            })

                        }else cb({
                            status: 404,
                            message: "operation non trouvée | dans la file d'attente ",
                            data: {}
                        })
                    })
                    .catch(error => {
                        cb({
                            status: 500,
                            message: "une erreur inconu vient de se produire",
                            data: {
                                idoperation: data['io'],
                                error: error
                            }
                        })
                    })
                }else cb(undefined, {
                    status: 100,
                    message: "still waiting scan of conductor",
                    data: {}
                })
            }else cb({
                status: 404,
                message: "operation non trouvé | dans la file d'attente ",
                data: {}
            })
        })
        .catch(error => {
            cb({
                status: 500,
                message: "une erreur inconu vient de se produire",
                data: {
                    idoperation: data['io'],
                    error: error
                }
            })
        })
    } catch (error) {
        cb({
            status: 500,
            message: "une erreur inconu vient de se produire",
            data: {
                idoperation: data['io'],
                error: error
            }
        })
    }
};
const userGetBillFromClient = async ( data, cb ) => {
    let { ic, _agent, p, io, type, _ms_key_agent, categ , itemsident} = data;
    p = parseInt(p);
    const transaction = await onConnexion.transaction();

    if(categ && categ === "card" && itemsident){
        await Card.findOne({
            where: {
                id_: itemsident
            }
        }, { transaction })
        .then(crd => {
            if(crd instanceof Card){
                if(parseInt(crd.datastatus) === parseInt(process.env.DB_DATASTATUS)){
                    if(crd.solde >= parseFloat(p)){
                        User.findOne({
                            where: {
                                id: _agent,
                                id_: _ms_key_agent
                            }
                        })
                        .then(usr => {
                            if(usr instanceof User){
                                if(crd.isassociated === process.env.DB_DATASTATUS){
                                    Client.findOne({
                                        where: {
                                            idcard: itemsident
                                        }
                                    })
                                    .then(c => {
                                        if(c instanceof Client){
                                            c.update({
                                                solde: c.solde - parseFloat(p)
                                            }, {transaction})
                                        }
                                    })
                                    .catch(err => {
                                        transaction.rollback()
                                        cb({
                                            message: "une erreur serveur vient de se produire",
                                            status: 500,
                                            data: err
                                        })
                                    })
                                }
                                crd.update({
                                    solde: crd.solde - parseInt(p)
                                }, {transaction})

                                usr.update({
                                    solde: usr.solde + parseFloat(p)
                                }, {transaction})

                                transaction.commit();
                                cb(undefined, {
                                    status: 200,
                                    message: "operation reussie",
                                    data: {
                                        idme: usr['id'],
                                        agentname: `${usr['fsname']} - ${usr['lsname']}`,
                                        agentid: usr['id_'],
                                        clientid: crd['id_'],
                                        clientname: `MS - Client`,
                                        newsolde: usr.solde,
                                        montantoperation: p,
                                        operationid: `MS-OP-${io}`,
                                        createdon: '',
                                        ispending: 0,
                                        type: 'paiement',
                                        status: 'succes'
                                    }
                                })
                            }else{
                                transaction.rollback();    
                                cb({
                                    status: 401,
                                    message: "C'est compte Agent n'est pas active' ou n'existe pas",
                                    data: {
                                        agentname: `MS Agent`,
                                        agentid: 'MS-AG-',
                                        clientid: itemsident,
                                        clientname: `MS Client`,
                                        newsolde: 0.0,
                                        montantoperation: p,
                                        operationid: `MS-OP-${new Date().getMilliseconds()}`,
                                        createdon: '',
                                        ispending: 0,
                                        type: 'paiement',
                                        status: 'echec',
                                    }
                                })
                            }
                        })
                    } else {
                        transaction.rollback();
                        cb({
                            status: 401,
                            message: "Solde insuffisant du client ",
                            data: {
                                agentname: `MS Agent`,
                                agentid: 'MS-AG-',
                                clientid: 'MS-',
                                clientname: `MS Client`,
                                newsolde: 0,
                                montantoperation: p,
                                operationid: `MS-OP-${new Date().getMilliseconds()}`,
                                createdon: '',
                                ispending: 0,
                                type: 'paiement',
                                status: 'echec',
                            }
                        }, undefined)
                    }
                } else {
                    transaction.rollback();
                    cb({
                        status: 409,
                        message: "La carte scannée n'est pas encore activée !",
                        data: {
                            // agentname: `MS Agent`,
                            // agentid: 'MS-AG-',
                            // clientid: cl['id_'],
                            // clientname: `${cl['fsname']} - ${cl['lsname']}`,
                            // newsolde: ag.solde,
                            // montantoperation: p,
                            // operationid: `MS-OP-${io}`,
                            // createdon: '',
                            // ispending: 0,
                            // type: 'paiement',
                            // status: 'echec',
                        }
                    })
                }
            } else {
                transaction.rollback();
                cb({
                    status: 404,
                    message: "La carte scannée n'existe pas !",
                    data: {}
                })
            }
        })
        .catch(err => {
            transaction.rollback();
            // console.log(err);
            cb({
                status: 500,
                message: "Une erreur serveur est servenue !",
                data: err
            })
        })
        return true; // as a break here
    }

    try {
        // clientsolde-, categorie, priceformclient, idclient, idagent, idoperation
        await _checkpayementclient({
            categorie: type,
            priceformclient: p,
            idclient: ic,
            idagent: _agent,
            idoperation : io
        }, (ret) => {
            console.log(ret);
            switch (parseInt(ret.sts)) {
                case 0:
                    Client.findOne({
                        where: {
                            id: ic,
                            datastatus: process.env.DB_DATASTATUS
                        }
                    })
                    .then(cl => {
                        if(cl instanceof Client){
                            User.findOne({
                                where: {
                                    id : _agent,
                                    datastatus: process.env.DB_DATASTATUS
                                }
                            })
                            .then(ag => {
                                if(ag instanceof User){
                                    ag.update({
                                        solde : ag.solde + (p - ret.ret)
                                    }, transaction);
                                    cl.update({
                                        solde : cl.solde - p
                                    }, transaction)

                                    transaction.commit();
                                    // agentname, agentid, clientid, clientname, newsolde, montantoperation, operationid, createdon, isreaded, type, status
                                    cb(undefined, {
                                        status: 200,
                                        message: "operation reussie",
                                        data: {
                                            idme: ag['id'],
                                            agentname: `${ag['fsname']} - ${ag['lsname']}`,
                                            agentid: ag['id_'],
                                            clientid: cl['id_'],
                                            clientname: `${cl['fsname']} - ${cl['lsname']}`,
                                            newsolde: ag.solde,
                                            montantoperation: p,
                                            operationid: `MS-OP-${io}`,
                                            createdon: '',
                                            ispending: 0,
                                            type: 'paiement',
                                            status: 'succes',
                                            newsoldeagent: ag.solde,
                                            newsoldeclient: cl.solde
                                        }
                                    })
                                }else{
                                        transaction.rollback();    
                                        cb({
                                        status: 401,
                                        message: "C'est compte Agent n'est pas active' ou n'existe pas",
                                        data: {
                                            agentname: `MS Agent`,
                                            agentid: 'MS-AG-',
                                            clientid: cl['id_'],
                                            clientname: `${cl['fsname']} - ${cl['lsname']}`,
                                            newsolde: ag.solde,
                                            montantoperation: p,
                                            operationid: `MS-OP-${io}`,
                                            createdon: '',
                                            ispending: 0,
                                            type: 'paiement',
                                            status: 'echec',
                                        }
                                    })
                                }
                            })
                        }else{
                            transaction.rollback();
                            cb({
                                status: 401,
                                message: "C'est compte Client n'est pas active' ou n'existe pas",
                                data: {
                                    agentname: `MS Agent`,
                                    agentid: 'MS-AG-',
                                    clientid: 'MS-',
                                    clientname: `MS Client`,
                                    newsolde: 0,
                                    montantoperation: p,
                                    operationid: `MS-OP-${io}`,
                                    createdon: '',
                                    ispending: 0,
                                    type: 'paiement',
                                    status: 'echec',
                                }
                            })
                        }
                    })
                break;
                case 2:
                    transaction.rollback();
                    cb({
                        status: 500,
                        message: "une erreur serveur vien de se produire !",
                        data: {
                            agentname: `MS Agent`,
                            agentid: 'MS-AG-',
                            clientid: 'MS-',
                            clientname: `MS Client`,
                            newsolde: 0,
                            montantoperation: p,
                            operationid: `MS-OP-${io}`,
                            createdon: '',
                            ispending: 0,
                            type: 'paiement',
                            status: 'echec',
                        }
                    }, undefined)
                    break;
                case 1:
                    transaction.rollback();
                    cb({
                        status: 401,
                        message: "Solde insuffisant du client ",
                        data: {
                            agentname: `MS Agent`,
                            agentid: 'MS-AG-',
                            clientid: 'MS-',
                            clientname: `MS Client`,
                            newsolde: 0,
                            montantoperation: p,
                            operationid: `MS-OP-${io}`,
                            createdon: '',
                            ispending: 0,
                            type: 'paiement',
                            status: 'echec',
                        }
                    }, undefined)
                default:
                    transaction.rollback();
                    cb({
                        status: 500,
                        message: "une erreur inconnue vient de se produire bdcbdhcdhcdchbdchdbcdhbcdhcbdhc!",
                        data: {
                            agentname: `MS Agent`,
                            agentid: 'MS-AG-',
                            clientid: 'MS-',
                            clientname: `MS Client`,
                            newsolde: 0,
                            montantoperation: p,
                            operationid: `MS-OP-${io}`,
                            createdon: '',
                            ispending: 0,
                            type: 'paiement',
                            status: 'echec',
                        }
                    },undefined )
                    break;
            }
        })
    } catch (error) {
        transaction.rollback();
        cb({
            status: 500,
            message: "une erreur du serveur vient tout juste de se produire",
            data: {
                agentname: `MS Agent`,
                agentid: 'MS-AG-',
                clientid: 'MS-',
                clientname: `MS Client`,
                newsolde: 0,
                montantoperation: p,
                operationid: `MS-OP-${io}`,
                createdon: '',
                ispending: 0,
                type: 'paiement',
                status: 'echec',
            }
        })
    }
};
export {
    userGetBillFromClient,
    onRechargeClient,
    onAddRechargeEndPoint,
    onPayingCaseClient,
    checkifdoneoperation
} 