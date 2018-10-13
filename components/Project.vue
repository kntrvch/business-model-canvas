<template>
<div class="project">
    <button @click="addCard" class="btn m-3"><i class="material-icons">add</i> Add card</button>
    <div class="grid-stack">

        <card v-for="card of cards" v-bind:key="card.id" :card="card" ></card>
        
    </div>
    </div>
</template>
<script>
module.exports = {
    data () {
        return {
            cards: [
                {id: '12345678', title: 'card#1', content: 'content#1', created: Date.now()}
            ], 
            grid: null
        }
    },
    name: 'Project',
    props: ['id'], 
    updated: function () {
        this.grid = $(this.$el).find('.grid-stack');
        this.grid.gridstack({cellHeight: 80, verticalMargin: 10});
        let gridStack = this.grid.data("gridstack");

console.log(this.cards);
        gridStack.enableMove(true);
        gridStack.enableResize(true);
        //gridStack.destroy(false);
        //gridStack.container.removeData("gridstack");

        //$grid.gridstack({cellHeight: 80, verticalMargin: 10});
    },
    methods: {
        addCard () {
            const time = Date.now();
            const card = {
                id: String(time),
                title: 'New card ' + (this.cards.length + 1),
                content: 'blah!',
                created: time
            };

            let gridStack = this.grid.data("gridstack");

            //gridStack.destroy(false);
            gridStack.container.removeData("gridstack");

            this.cards.push(card);
            console.log(this.cards);
        }
    }, 
    components: {
    'Card': httpVueLoader('components/Card.vue')
  }
}
</script>
<style>

</style>

