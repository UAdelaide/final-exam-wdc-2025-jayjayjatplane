/* global Vue */

const { createApp } = Vue;

createApp({
    data() {
        return {
            title: 'Dog of the Day Image',
            buttonText: 'Reload Image',
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
