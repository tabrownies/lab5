<template>
    <div class="wrapper">
        <div class="image">
            <img :src="photo.path" />
            <div class="photoInfo">
                <p class="photoTitle">{{photo.title}}</p>
                <p class="photoName">{{photo.user.firstName}} {{photo.user.lastName}}</p>
            </div>
            <p class="photoDate">{{formatDate(photo.created)}}</p>
        </div>
        <div class="comments">
            <p v-for="comment in comments" :key="comment">
                
            </p>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    import moment from 'moment';
    export default {
        name: "Photo",
        data: () => {
            return {
                id: String,
                photo: {},
                comments:Array,
            }
        },
        created() {
            this.id = this.$route.params.id;
            this.getPhoto();
            console.log(this.photo);
        },
        methods: {
            async getPhoto() {
                try {
                    let response = await axios.get(`/api/photos/${this.id}`);
                    this.photo = response.data;
                    console.log(this.photo);
                } catch (error) {
                    this.error = error.response.data.message;
                }
            },
            formatDate(date) {
                if (moment(date).diff(Date.now(), 'days') < 15)
                    return moment(date).fromNow();
                else
                    return moment(date).format('d MMMM YYYY');
            }
        }
    }
</script>
<style scoped>
    .image{
        position: relative;
        top:150px;
        width:80%
    }
    .photoInfo {
        display: flex;
        justify-content: space-between;
        font-size: 0.8em;
    }

    .photoInfo p {
        margin: 0px;
    }

    .photoDate {
        font-size: 0.7em;
        font-weight: normal;
    }

    p {
        margin: 0px;
    }
</style>