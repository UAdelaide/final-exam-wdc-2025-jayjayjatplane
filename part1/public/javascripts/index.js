/* global Vue */
/* eslint-disable no-console */

const { createApp } = Vue;

createApp({
    data() {
        return {
            title: 'Dog of the Day Image',
            buttonText: 'Reload Image',
            dogOfTheDayImage: '',
            isFirstReload: true
        };
    },
    computed: {
        buttonClass() {
            if (this.isFirstReload) {
                return 'greyButton';
            }
            return 'blueButton';
        }
    },
    methods: {
        loadNewDog() {
            fetch('https://dog.ceo/api/breeds/image/random')
                .then((res) => res.json())
                .then((data) => {
                    this.dogOfTheDayImage = data.message;
                    this.isFirstReload = false;
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