/* global Vue */
/* eslint-disable no-console */

const { createApp } = Vue;

createApp({
    data() {
        return {
            title: 'Dog of the Day Image',
            buttonText: 'Reload Image',
            dogOfTheDayImage: '',
            canReload: false
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
                    console.error('There was an error loading the dog image:', err);
                });
        },
        submitReload() {
            if (this.canReload) {
                this.loadNewDog();
            }
        }
    },
    mounted() {
        this.loadNewDog();
    }
}).mount('#app');