var config = {
    apiKey: "AIzaSyDdWsEF41pwAi-j2Xnhs6ScOnuuiL3uonE",
    authDomain: "putni-nalozi-ab394.firebaseapp.com",
    databaseURL: "https://putni-nalozi-ab394.firebaseio.com",
    projectId: "putni-nalozi-ab394",
    storageBucket: "",
    messagingSenderId: "506349884226"
  };
  firebase.initializeApp(config);


var oDb = firebase.database();
var oDbGradovi = oDb.ref('gradovi');
var oDbKorisnici =oDb.ref('korisnici');
var oDbPutniNalozi = oDb.ref('putni_nalozi');
var oDbVrstaPrijevoza = oDb.ref('vrsta_prijevoza');