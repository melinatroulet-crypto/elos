// Sincronização do espaço do casal com o Firestore (documento casal/principal).
// As regras do Firestore limitam o acesso às duas contas autorizadas.
(function () {
  var NAMES = { "melina.t.roulet@gmail.com": "Melina", "fabien.b.roulet@gmail.com": "Fabien" };
  var ref = null, timer = null, started = false, lastSaved = null;

  window.elosStart = function (user) {
    if (started || !window.firebase) return;
    started = true;
    var nome = NAMES[user.email];
    if (!nome) return;
    ref = firebase.firestore().collection("casal").doc("principal");
    ref.onSnapshot(function (snap) {
      if (snap.metadata.hasPendingWrites) return;
      if (!snap.exists) {
        // Primeiro acesso: cria o espaço vazio com o que está neste navegador.
        state.profile = nome;
        window.save();
        return;
      }
      var dados = snap.data().dados;
      if (dados === lastSaved) return;
      try {
        var recebido = JSON.parse(dados);
        recebido.profile = nome;
        state = recebido;
        lastSaved = dados;
        localStorage.setItem(key, JSON.stringify(state));
        render();
      } catch (e) {
        toast("Não foi possível ler os dados do espaço.");
      }
    }, function () {
      toast("Sem conexão com o espaço de vocês. Tente de novo.");
    });
  };

  window.save = function () {
    try { localStorage.setItem(key, JSON.stringify(state)); } catch (e) {}
    if (!ref) return;
    clearTimeout(timer);
    timer = setTimeout(function () {
      var dados = JSON.stringify(state);
      lastSaved = dados;
      ref.set({
        dados: dados,
        atualizadoEm: firebase.firestore.FieldValue.serverTimestamp(),
        atualizadoPor: state.profile
      }).catch(function () {
        toast("Não foi possível sincronizar agora. Suas alterações ficam neste aparelho.");
      });
    }, 400);
  };
})();
