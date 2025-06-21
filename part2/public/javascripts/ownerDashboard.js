import { createApp, ref, onMounted } from 'vue';

// initialise Vue app for owner dashboard
createApp({
    setup() {
        // reactive array to hold fetched dogs
        const dogs = ref([]);
        // reactive string to hold error messages
        const error = ref('');

        // load the owner's dogs from the server
        async function loadDogs() {
            try {
                // send GET request to /api/users/dogs
                const res = await fetch('/api/users/dogs');
                if (!res.ok) throw new Error('Failed to load dogs');
                // update dogs array with response data
                dogs.value = await res.json();
            } catch (err) {
                // log if something goes wrong
                console.error('Failed to retrieve dog list:', err);
                // store the error message
                error.value = err.message;
            }
        }

        // fetch dogs when component mounts
        onMounted(loadDogs);

        // expose form model, dogs list, and error to template
        return {
            form: ref({ dog_id: '' }),
            dogs,
            error
        };
    }
}).mount('#app');
