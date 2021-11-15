import { Button } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveProductAction } from '../../../redux/actions/productAction';

export default function CreateProduct() {

    const dispatch = useDispatch();
    const {loading, error} = useSelector(({products: productRegister})=>productRegister);

    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState('');
    const [qty, setQuatity] = useState('');
    const [avatar, setAvatar] = useState('');
    const [categorie, setCategory] = useState('');

    const onFileChange = (e)=>{
        const file = e.target.files[0];
        if(file){
            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onloadend = () =>{
                setAvatar(reader.result);
                console.log(avatar);
            }
        }
    }
    const submitHandler = (e)=>{
        e.preventDefault()
        saveProductAction({
            name:name,
            desc: desc,
            price: price,
            qty: qty,
            avatar: avatar,
            categorie: categorie
        })(dispatch)
    }
    return (
        <div className="newUser">
        <h1 className="newUserTitle">New Product</h1>
        {
            loading &&
        <span>Chargement...</span>
        }{
            error &&
            <div className="div-err">{error}</div>
        }
        <form action="" enctype="multipart/form-data"className="newUserForm" onSubmit={(submitHandler)} >
            <div className="newUserItem">
                <label htmlFor="name">Name</label>
                <input type="text" onChange = {(e)=>setName(e.target.value)} />
            </div>
            <div className="newUserItem">
                <label htmlFor="name">Description</label>
                <input type="text" onChange = {(e)=>setDesc(e.target.value)} />
            </div>
            <div className="newUserItem">
                <label htmlFor="email">Price</label>
                <input type="number" onChange = {(e)=> setPrice(e.target.value)} />
            </div>
            <div className="newUserItem">
                <label htmlFor="phone">Quantity</label>
                <input type="number"onChange = {(e)=>setQuatity(e.target.value)} />
            </div>
           <div className="newUserItem">
               <label htmlFor="avatar">Avatar</label>
               <input className="avatarInput" type="file" accept="image/*" onChange = {(e)=>onFileChange(e)} />
           </div>
            <div className="newUserItem">
                <label htmlFor="">Category</label>
                <input type="text"onChange = {(e)=>{setCategory(e.target.value)}} />
            </div>
            <Button type="submit" disabled={!name || !price || !desc || !avatar || !qty || !categorie } className="newUserButton">Create</Button>

        </form>
    </div>
    )
}
