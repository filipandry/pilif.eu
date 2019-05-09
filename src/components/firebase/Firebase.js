
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyCn3o8KVOL1DowsqQW2XVKQv25oinazWNQ",
    authDomain: "pilifeu.firebaseapp.com",
    databaseURL: "https://pilifeu.firebaseio.com",
    projectId: "pilifeu",
    storageBucket: "pilifeu.appspot.com",
    messagingSenderId: "693749888078",
    appId: "1:693749888078:web:68d74c92c7024d61"
  };

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
        this.db = app.database();
    }

    doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);
    doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);
    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
    doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

    getNextId = table => this.db.ref(table).once('value').then(snapshot => {
      var id = (snapshot.val() && Math.max.apply(Math,Object.keys(snapshot.val()).map(i => parseInt(i)))) || 0;
      id++;
      console.log(id);
      return id;
    })
    writePortfolioData = (id, title, text, image, group) => {
      var promise = this.db.ref('portfolio/' + id).set({
        id: id,
        group: group,
        title: title,
        text: text,
        image: image,
      })
      this.db.ref('groups/' + group + "/portfolios/"+ id).set(true);
      return promise;
    };
}

  export default Firebase;