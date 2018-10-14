const store = new Vuex.Store({
    state: {
      cards: JSON.parse(localStorage.getItem('cards')) || [{
        id: Date.now(),
        title: '[Empty]', 
        x: 0, 
        y: 0, 
        width: 3, 
        height: 3
      }]
    }, 
    mutations: {
      addData(state, data) {
        
        if (data.length > 0) {
          localStorage.setItem('cards', data);
          state.cards = JSON.parse(data);
          console.log('store',state.cards);
        }
      }
    }, 
    getters: {
      getData(state) {
        return state.cards;
      }
    }, 
    actions: {
     
    }
});