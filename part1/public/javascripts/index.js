/* global Vue */
/* eslint-disable no-console */

const { createApp } = Vue;

createApp({
    data() {
        return {
            title: 'Dog of the Day Image',
            buttonText: 'change the dog!',
            dogOfTheDayImage: ''
        };
    },
    methods: {
        loadNewDog() {
            fetch('https://dog.ceo/api/breeds/image/random')
                .then((res) => res.json())
                .then((data) => {
                    this.dogOfTheDayImage = data.message;
                })
                .catch((err) => {
                    console.error('There was a an error loading the dog image:', err);
                });
        }
    },
    mounted() {
        this.loadNewDog();
    }
}).mount('#app');
