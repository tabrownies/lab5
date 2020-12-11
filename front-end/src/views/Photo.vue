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
        <div class="addComment" v-show="this.$root.$data.user!==null">
            <h2>Add a Comment!</h2>
            <textarea v-model="commentText">
            </textarea>
            <button @click="addComment">
                Comment
            </button>
        </div>

        <div class="comments">
            <h2>Comments</h2>
            <div v-for="comment in comments" :key="comment._id" class="comment">
                <p>{{comment.text}}</p>
                <div class="commentInfo">
                    <p>{{comment.user.firstName}} {{comment.user.lastName}}</p>
                    <p>{{formatDate(comment.created)}}</p>
                </div>

            </div>

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
                photo: Object,
                comments: Array,
                commentText: '',
            }
        },
        async created() {
            this.id = this.$route.params.id;

            await this.getPhoto();
            await this.getComments();
        },
        methods: {
            async getPhoto() {
                try {
                    let response = await axios.get(`/api/photos/${this.id}`);
                    this.photo = response.data;
                } catch (error) {
                    this.error = error.response.data.message;
                }
            },
            formatDate(date) {
                if (moment(date).diff(Date.now(), 'days') < 15)
                    return moment(date).fromNow();
                else
                    return moment(date).format('d MMMM YYYY');
            },
            async getComments() {
                try {
                    let responce = await axios.get(`/api/comments/${this.photo._id}`);
                    this.comments = responce.data;
                } catch (error) {
                    console.log(error);
                }
                console.log(this.comments);
            },
            async addComment() {
                try {
                    axios.post('/api/comments', {
                        user: this.$root.$data.user,
                        photo: this.photo,
                        text: this.commentText,
                    });
                } catch (error) {
                    console.log(error);
                }
                this.commentText = '';
                this.getComments();
            }
        }
    }
</script>
<style scoped>
    .wrapper {
        padding-top: 150px;
        display: flex;
        flex-direction: column;
        align-items: center;
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

    .addComment {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    .addComment h2 {
        font-size: 20px;
        ;
    }

    textarea {
        height: 100px;
        width: 100%;
    }

    .addComment button {
        margin: 5px;
    }

    .comments {
        width: 100%;
    }
    .comments h2{
        font-size:20px;
    }
    .comment {
        margin: 10px;
        font-size:20px;
    }
    .comment p{
        margin:5px;
    }
    .commentInfo{
        display:flex;
        justify-content: space-between;
        font-size: 15px;
    }
</style>