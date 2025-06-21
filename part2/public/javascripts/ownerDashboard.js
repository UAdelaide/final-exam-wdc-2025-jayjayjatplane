import { createApp, ref, onMounted } from 'vue';

createApp({
    setup() {
        // reactive array to hold the owner’s dogs
        const dogs = ref([]);
        // reactive string for any fetch error
        const error = ref('');

        // fetch list of dogs for the logged-in owner
        async function loadDogs() {
            try {
                const res = await fetch('/api/users/dogs');
                if (!res.ok) throw new Error('Failed to load dogs');
                dogs.value = await res.json();
            } catch (err) {
                console.error('Error fetching dogs:', err);
                error.value = err.message;
            }
        }

        // run once when the component mounts
        onMounted(loadDogs);

        // expose to the template
        return { form: ref({ dog_id: '' }), dogs, error };
    }
}).mount('#app');