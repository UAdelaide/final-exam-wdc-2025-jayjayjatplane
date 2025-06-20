const { createApp } = Vue;

createApp({
    data() {
        return {
            title: 'Dog of the Day',
            buttonText: 'Reload Image',
            dogOfTheDayImage: ''
        };
    },
    methods: {
        loadDog() {
            fetch('https://dog.ceo/api/breeds/image/random')
                .then(res => res.json())
                .then(data => {
                    this.dogOfTheDayImage = data.message;
                })
                .catch(err => {
                    console.error('There was an Error loading dog image:', err);
                });
        }
    },
    mounted() {
        this.loadNewDog();
    }
}).mount('#app');
