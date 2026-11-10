// Login com Google. A lista abaixo só controla a tela; a segurança real está nas regras do Firestore.
(function () {
  var ALLOWED = ["melina.t.roulet@gmail.com", "fabien.b.roulet@gmail.com"];
  var login = document.getElementById("login");
  var btn = document.getElementById("login-btn");
  var msg = document.getElementById("login-msg");

  function show(signedIn) {
    document.body.classList.toggle("signed-in", signedIn);
    if (login) login.hidden = signedIn;
  }

  try {
    firebase.initializeApp(window.FIREBASE_CONFIG);
    var auth = firebase.auth();
    auth.getRedirectResult().catch(function (e) {
      if (msg) msg.textContent = "Não foi possível entrar. Tente de novo.";
    });
    auth.onAuthStateChanged(function (user) {
      if (user && ALLOWED.indexOf(user.email) !== -1) {
        show(true);
      } else {
        show(false);
        if (user) {
          if (msg) msg.textContent = "Este Google não está autorizado para o elos.";
          auth.signOut();
        }
      }
    });
    if (btn) btn.addEventListener("click", function () {
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      auth.signInWithRedirect(provider);
    });
  } catch (e) {
    show(false);
    if (msg) msg.textContent = "Não foi possível conectar ao Firebase.";
  }
})();
