/* global Vue */
/* eslint-disable no-console */

const { createApp } = Vue;

createApp({
    data() {
        return {
            title: 'Dog of the Day Image',
            buttonText: 'change the dog!',
            dogOfTheDayImage: '',
            canReload: false
        };
    },
    methods: {
        loadNewDog() {
            if (!this.canReload) return;
            fetch('https://dog.ceo/api/breeds/image/random')
                .then((res) => res.json())
                .then((data) => {
                    this.dogOfTheDayImage = data.message;
                    this.canReload = false;
                })
                .catch((err) => {
                    console.error('There was an error loading the dog image:', err);
                });
        }
    },
    mounted() {
        this.loadNewDog();
    }
}).mount('#app');
