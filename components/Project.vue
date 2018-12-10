<template>
<div class="project">
    <button @click="addCard" class="btn m-3"><i class="material-icons">add</i> Add card</button>
    <button @click="toCanvas" class="btn m-3"><i class="material-icons">camera_alt</i> Snapshot<sup> <small class="text-muted p-1">BETA</small></sup></button>
    <button @click="showExportCode" class="btn m-3"><i class="material-icons">import_export</i> Export</button>
    <div id="business-canvas">
        <div class="grid-stack">
            <card v-for="card of cards" v-bind:key="card.id" @transform="serializeCards" :card="card" 
            :data-gs-id="card.id"
            :data-gs-x="card.x"
            :data-gs-y="card.y"
            :data-gs-width="card.width"
            :data-gs-height="card.height"
            :data-gs-auto-position="card.auto_position"
            @remove-card="removeCard(card.id)"></card>
        </div>    
    </div>    
</div>
</template>
<script>
module.exports = {
    data () {
        return {
            cards: this.$store.getters.getData, 
            grid: null, 
            selectedId: this.$store.getters.getData[0] || null,
            serializedCards: []
        }
    },
    name: 'Project',
    props: ['id'], 
    updated: function () {
        this.grid = $(this.$el).find('.grid-stack');
        this.grid.gridstack({cellHeight: 80, verticalMargin: 10});
        let gridStack = this.grid.data("gridstack");
        //this.$store.state.cards = gridStack.grid.nodes;
        
        gridStack.enableMove(true);
        gridStack.enableResize(true);

        this.serializeCards();

        //gridStack.destroy(false);
        //gridStack.container.removeData("gridstack");

        //$grid.gridstack({cellHeight: 80, verticalMargin: 10});

        
    },
     computed: {
        selectedCard() {
            return this.cards.find(card => card.id === this.selectedId);
        }, 
        newId: {
            set: function(id) {
                this.selectedId = id;
            }, 
            get: function () {
                return this.selectedId
            },
        }
    },
    methods: {
        removeCard(id) {
            console.log('removing ', id);
            console.log(this.cards);
            if (confirm('Are you sure to delete this card?')) {
                this.newId = id;
                const index = this.cards.indexOf(this.selectedCard);
                console.log(this.selectedCard);
                console.log('wut1');
                if (index !== -1) {
                    console.log('wut2');
                    this.cards.splice(index, 1);
                    console.log(this.cards);
                    let gridStack = this.grid.data("gridstack");

                    //gridStack.destroy(false);
                    gridStack.container.removeData("gridstack");
                    this.serializeCards();
                    console.log(this.cards);
                }
            }
        },

        addCard () {
            const time = Date.now();
            const card = {
                id: String(time),
                title: '[Empty]',
                content: '[Empty]',
                x: 0, 
                y: 0, 
                width: 3, 
                height: 3, 
                auto_position: true
            };

            let gridStack = this.grid.data("gridstack");

            //gridStack.destroy(false);
            gridStack.container.removeData("gridstack");

            this.cards.push(card);
        }, 
        toCanvas () {
            html2canvas(document.querySelector("#business-canvas")).then(canvas => {
                $("#canvasModal .modal-body").html(canvas);
            }).then(() => {
                $("#canvasModal").modal('show');
            });
        }, 
        serializeCards () {
            console.log(this.$root.$children[0].$children);
            this.serializedCards.splice(0, this.serializedCards.length);

            let cardComponents = this.$root.$children[0].$children
            cardComponents.forEach(element => {
                let node = $(element.$el).data('_gridstack_node');
                console.log(node);
                this.serializedCards.push({
                    x: node.x,
                    y: node.y,
                    width: node.width,
                    height: node.height,
                    id: node.id,
                    title: $(node.el).find('.card-title-input').val(),
                    content: $(node.el).find('.note-editable').html(), 
                    auto_position: false
                });
            });

            store.commit('addData', JSON.stringify(this.serializedCards, null, ''));
            console.log("updated", this.$store.state.cards);
        }, 
        showExportCode () {
            $("#serializationModal .modal-body pre").text(JSON.stringify(this.serializedCards, null, '  '));
            $("#serializationModal").modal('show');
        }
    }, 
    components: {
        'Card': httpVueLoader('components/Card.vue')
    }
}
</script>
<style>

</style>

