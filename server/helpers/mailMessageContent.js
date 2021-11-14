const sendPasswordEmailHTML = (fsname, lsname, pwd, phone)=>`

<div style="width: 80%; margin: 0 auto; font-family: sans-serif;">
    <nav style="background-color: #517be6; padding: 0.1rem;">
      <h1 style="text-align: center;">Mile Services TransPay veut  a besoin que vous vérifiiez votre adresse e-mail</h1>
    </nav>

    <div style="padding: 2rem;">
        <h2> Salut ${fsname} ${lsname} !</h2>
        <p>
            Vous vous êtes récemment inscrit sur Mile Services TransPay (MSTP), nous vous avons envoyé cet email afin de vérifier si l'email que vous nous avez fourni est viable,
            pour des raisons de sécurité et de meilleurs services que vous recevez de MSTP !
        </p>

        <p>
            Gardez à l'esprit que vous devez toujours vous souvenir de votre Numero de telephone <h4>${phone}</h4>
            et le mot de passe <h4>${pwd}</h4> que vous venons d'envoyer  et ne le partagez avec personne d'autre !
        </p> 

      <div style="padding: 1rem 0 1rem 0;">
        <p style="background-color: #517be6; color: #ffffff; width: 100%; padding: 0.8rem; border-radius: 0.2rem;">
            Votre mot de passe est <b style:="color:red">${pwd}</b>
        </p>
      </div>

      <p>
        Si vous ne vous êtes pas récemment inscrit au système de Mile Services TransPay,
        nous sommes désolés pour ce désagrément, ignorez cet e-mail !
      </p>

      <div>
        <p>Votre sincèrement,</p>
        <p>Mile Services TransPay</p>
      </div>

      <footer style="background-color: #c4c4c4; padding: 0.1rem">
        <p style="text-align: center; font-size: 0.8rem;">© 2021 <a href="#">MSTP</a>. Tous les droits sont réservés.</p>
      </footer>
  </div>
`

export const sendPasswordEmailContent = (userData) => {
    const { fsname, lsname, pwd, phone } = userData;
    const EmailContentHTML = sendPasswordEmailHTML(fsname, lsname, pwd,phone);
  
    const EmailContentPlainText = `
    Remarque : Mile Services veut  a besoin que vous vérifiiez votre adresse e-mail
  
      Salut ${fsname} ${lsname}!
  
      Vous vous êtes récemment inscrit sur Mile Services TransPay (MSTP), nous vous avons envoyé cet email afin de vérifier si l'email que vous nous avez fourni est viable,
      pour des raisons de sécurité et de meilleurs services que vous recevez de MSTP !

      Gardez à l'esprit que vous devez toujours vous souvenir de votre Numero de telephone ${phone}
      et le mot de passe ${pwd} que vous venons d'envoyer  et ne le partagez avec personne d'autre !
  
      ${pwd}
  
      Si vous ne vous êtes pas récemment inscrit au système de Mile Service TransPay,
      nous sommes désolés pour ce désagrément, ignorez cet e-mail !
  
      Votre sincèrement,
      Mile Services TransPay
    `;
    return { EmailContentHTML, EmailContentPlainText };
  };

  const generateProuveTransactionHTML = (adminFName, adminLName, validateUrl, appUrl, montant)=>`
  <div style="width: 70%; margin: 0 auto; font-family: sans-serif;">
  <nav style="background-color: #c4c4c4; padding: 0.1rem;">
    <h1 style="text-align: center;">Approuver une nouvelle Transaction de Ms Pay</h1>
  </nav>

  <div style="padding: 2rem;">
    <h2>Hello ${adminFName} ${adminLName}!</h2>

    <p>Il y a une nouvelle transaction de ${montant} qui a été enregistré sur Ms Pay, veuillez vérifier cette transaction s'il/elle est autorisé à être sur Ms Pay.
    Cliquez sur le lien ci-dessous pour en savoir plus sur cette transaction.</p>

    <p>Avant d'approuver cette transaction, veuillez lire attentivement si cette transaction est transmise legalement et si s'elle la bonne qui devrait être sur le système.</p>

    <div style="padding: 1rem 0 1rem 0;">
      <a href="${validateUrl}" style="background-color: #861A02; color: #ffffff; width: 40%; padding: 0.8rem; text-decoration: none; border-radius: 0.2rem;">
      Vérifier la nouvelle transaction </a>
    </div>

    <p>
    Veuillez noter que si cette transaction n'est pas approuvée,
        certaines operations seront suspendues momentanément !</p>

    <div>
      <p>Votre sincèrement,</p>
      <p>Mile Services Pay</p>
    </div>
  </div>
  <footer style="background-color: #c4c4c4; padding: 0.1rem">
    <p style="text-align: center; font-size: 0.8rem;">© 2021 <a href="${appUrl}">Ms Pay</a>. Tous les droits sont réservés.</p>
  </footer>
</div>
`;

export const generateProuveTransactionContent = ( userData,adminData, appUrl) => {
  const { id: operationId, montant: montant} = userData;
  const { firstName: adminFName, lastName: adminLName } = adminData;
  const validateUrl = `${appUrl}/operations/${operationId}`;
  const approveTransactionEmailContentHTML = generateProuveTransactionHTML(
    adminFName, adminLName, validateUrl, appUrl
  );

  const approveTransactionEmailContentPlainText = `
  Remarque : Si vous ne pouvez pas voir cet e-mail correctement, veuillez utiliser un navigateur
  Ms Pay a besoin que vous vérifiiez votre adresse e-mail

    Salut ${adminFName} ${adminLName}!

    Il y a une nouvelle transaction de ${montant} qui a été enregistré sur Ms Pay, veuillez vérifier cette transaction s'il/elle est autorisé à être sur Ms Pay.
    Cliquez sur le lien ci-dessous pour en savoir plus sur cette transaction.

    Avant d'approuver cette transaction, veuillez lire attentivement si cette transaction est transmise legalement et si s'elle la bonne qui devrait être sur le système.

    Avant d'approuver cette transaction, veuillez lire attentivement si cette transaction est transmise legalement et si s'elle la bonne qui devrait être sur le système.
    Vous pouvez lui attribuer un nouveau rôle, sinon il sera comptable par défaut.

    ${validateUrl}

    Veuillez noter que si cette transaction n'est pas approuvée,
    certaines operations seront suspendues momentanément !
    
    Votre sincèrement,
    Mile Services Pay
  `;
  return {
    approveTransactionEmailContentHTML,
    approveTransactionEmailContentPlainText,
  };
};