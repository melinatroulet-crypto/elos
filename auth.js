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
      if (msg) msg.textContent = "";
      // Janela pop-up funciona melhor no Chrome; o redirecionamento é só plano B.
      auth.signInWithPopup(provider).catch(function (e) {
        if (e && (e.code === "auth/popup-blocked" || e.code === "auth/operation-not-supported-in-this-environment")) {
          auth.signInWithRedirect(provider);
        } else if (e && e.code !== "auth/popup-closed-by-user" && e.code !== "auth/cancelled-popup-request") {
          if (msg) msg.textContent = "Não foi possível entrar. Tente de novo.";
        }
      });
    });
  } catch (e) {
    show(false);
    if (msg) msg.textContent = "Não foi possível conectar ao Firebase.";
  }
})();
