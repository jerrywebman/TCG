const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

//sendgrid config
const sgMail = require("@sendgrid/mail");
const API_KEY = functions.config().sendgrid.key;
const TEMPLATE_ID = functions.config().sendgrid.template;
sgMail.setApiKey(API_KEY);

exports.welcomeEmail = functions.auth.user().onCreate((user) => {
  const msg = {
    to: user.email,
    from: "info@thecoingrowth.com",
    subject: "Welcome to The Coin Growth",
    text: "TCG Registration Email",
    html: "<p>The Coin Growth Registration Email</p>",
    templateId: "d-beccc1f0e419401ab81fb1c0ccdf6230",
    dynamic_template_data: {
      email: user.email,
    },
  };
  return sgMail.send(msg);
});

exports.simpleDbFunction = functions.database
  .ref("/pendingOrder")
  .onCreate((snap, context) => {
    if (context.authType === "ADMIN") {
      // do something
      alert("Admin here");
    } else if (context.authType === "USER") {
      alert("user here");
      console.log(snap.val(), "written by", context.auth.uid);
    }
  });

exports.depositEmail = functions.database
  .ref("pendingOrder/{orderId}/")
  .onCreate(async (snapshot, context) => {
    const orderId = context.params.orderId;
    const orderData = snapshot.val();
    const msg = {
      to: orderId,
      from: "info@thecoingrowth.com",
      subject: "We received your request",
      text: "Your requestl",
      html: `<p>Hello, <br/><br/> Your Deposit request of ${orderData.amount} has been received <br></br> Regards<br/> The Coin Growth Team</p>`,
      templateId: "d-7083bdf091c84ea5852ede6f15489a45",
      dynamic_template_data: {
        category: orderData.category,
        amount: orderData.amount,
        plan: orderData.plan,
      },
    };
    return sgMail.send(msg);

    // if (context.authType === "ADMIN") {
    //   // do something
    // } else if (context.authType === "USER") {
    //   const pendingDeposit = await db
    //     .collection("pendingOrder")
    //     .doc("jerrycifeanyi@gmail.com")
    //     .get();

    //   const deposit = pendingDeposit.data();
    //   const msg = {
    //     to: "jerrycifeanyi@gmail.com",
    //     from: "info@thecoingrowth.com",
    //     subject: "We received your deposit request",
    //     html:
    //       "<p>Hello, <br/><br/> Your Deposit request of `${deposit.amount}` has been received <br></br> Regards<br/> The Coin Growth Team</p>",
    //   };
    //   return sgMail.send(msg);
    //   // console.log(snap.data(), 'written by', context.auth.uid);
    // }
    //read pending deposit document
  });

exports.addAdminRole = functions.https.onCall((data, context) => {
  // check request is made by an admin
  if (context.auth.token.admin !== true) {
    return { error: "Only admins can add other admins" };
  }
  // get user and add admin custom claim
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: true,
      });
    })
    .then(() => {
      return {
        message: `Success! ${data.email} has been made an admin.`,
      };
    })
    .catch((err) => {
      return err;
    });
});
