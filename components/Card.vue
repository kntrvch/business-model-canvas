<template>
    <div class="grid-stack-item">
        <div class="grid-stack-item-content" v-bind:class="{ 'active': active }">
            <div class="card">
                <div class="card-body">
                    <a v-if="!active" @click="editCard()" class="btn btn-link btn-edit float-right text-body" href="#" data-toggle="tooltip" data-original-title="Edit">
                        <i class="material-icons">edit</i>
                    </a>
                    <a v-if="active" @click="leaveCard()" class="btn btn-link btn-edit float-right text-success" href="#" data-toggle="tooltip" data-original-title="Save">
                        <i class="material-icons">done</i>
                    </a>
                    <div class="form-horizontal">
                        <div class="form-group">
                            <input v-model="card.title" class="card-title-input form-control" :disabled="!active" placeholder="[Empty]" />
                        </div>
                        <div class="form-group">
                            <textarea v-model="card.content" class="card-content-input form-control airnote" :disabled="!active" placeholder="[Empty]">[Empty]</textarea>
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
        var scrollOptions = {
            distance: '20px', 
            height: '100%'
        }
        $(this.$el).find('.card-body').slimScroll(scrollOptions);
        $('.grid-stack').on('change', (event, elem) => {
            this.$emit('transform');
        });
        $(".slimScrollBar").hide();
        $('.grid-stack').on('gsresizestop', (event, elem) => {
            $(elem).find('.card-body').slimScroll(scrollOptions);
        });
        $('.airnote').summernote({
            airMode: true, 
            popover: {
                air: [
                    ['color', ['color']],
                    ['fontsize', ['fontsize']],
                    ['font', ['bold', 'italic', 'underline', 'strikethrough', 'clear']],
                    ['para', ['ul', 'ol', 'paragraph']],
                    ['height', ['height']],
                ]
            },
        });
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
        disableAll() {

        }
    }
}
</script>
<style>

</style>

