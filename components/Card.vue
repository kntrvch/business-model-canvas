<template>
    <div class="grid-stack-item" data-gs-width="3" data-gs-height="3" data-gs-auto-position="true">
        <div class="grid-stack-item-content" v-bind:class="{ 'active': active }">
            <div class="card">
                <div class="card-body">
                    <a v-if="!active" @click="editCard()" class="btn btn-link float-right text-body" href="#" data-toggle="tooltip" data-original-title="Edit">
                        <i class="material-icons">edit</i>
                    </a>
                    <a v-if="active" @click="leaveCard()" class="btn btn-link float-right text-success" href="#" data-toggle="tooltip" data-original-title="Save">
                        <i class="material-icons">done</i>
                    </a>
                    <div class="form-horizontal">
                        <div class="form-group">
                            <input v-model="card.title" class="form-control" placeholder="Card title" />
                        </div>
                        <div class="form-group">
                            <div class="airnote">asd</div>
                        </div>
                    </div>
                </div>
            </div>   
        </div>
    </div>
</template>
<script>
module.exports = {
    data () {
        return {
            active: false
        }
    },
    name: 'Card', 
    props: ['card'], 
    mounted: function () {
        $('.airnote').summernote({
            airMode: true
        });
        $('[data-toggle="tooltip"]').tooltip();
    },
    methods: {
        editCard() {
            console.log('edit me');
            this.active = true;
            $(this.$el).draggable({
                disabled: true
            });
            $('[data-toggle="tooltip"]').tooltip('hide');
        }, 

        leaveCard() {
            console.log('leave me');
            this.active = false;
            $(this.$el).draggable({
                disabled: false
            });
            $('[data-toggle="tooltip"]').tooltip('hide');
        }, 
    }
}
</script>
<style>

</style>

