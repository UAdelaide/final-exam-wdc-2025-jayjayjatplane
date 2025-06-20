/* eslint-disable no-new */
new Vue({
    el: '#app',
    data: {
        title: 'Dog of the Day',
        buttonText: 'Reload Image',
        dogOfTheDayImage: ''
    },
    methods: {
        loadDog: function () {
            var vm = this;
            fetch('https://dog.ceo/api/breeds/image/random')
                .then(function (response) { return response.json(); })
                .then(function (data) { vm.dogOfTheDayImage = data.message; })
                .catch(function (error) { console.error('Error loading dog image:', error); });
        }
    },
    mounted: function () {
        this.loadDog();
    }
});