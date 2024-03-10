
<script setup>
import { ref, onMounted } from 'vue';
import { useMenuStore } from '@/stores/menuMakan';

const menuStore = useMenuStore()
//const listMakanan = menuStore.ambilData()

const listMakanan = ref([]);
const submittedSuccessfully = ref(false);
const editedSuccessfully = ref(false);

const menuChoose = ref({ 
    name: '',
    price: '',
    detail: '',
    image: ''
});

const newMenu = ref({
    name: '',
    price: '',
    detail: '',
    image: ''
});

const state = {
    addModal: null,
    editModal: null,
    showEditModal: ref(false) 
}

onMounted(async () => {
    state.addModal = new bootstrap.Modal('#addModal', {})
    state.editModal = new bootstrap.Modal('#editModal', {})
    await fetchData()
})

async function fetchData() {
    listMakanan.value = await menuStore.fetchMenuItems();
}

async function openModalAdd() {
    state.addModal.show()
}

async function addMenu() {
    await menuStore.createMenu(newMenu.value);
    state.addModal.hide();
    await fetchData();
    submittedSuccessfully.value = true;
    resetNewMenu();
}

function openModalEdit(menu) {
    state.editModal.show()
    Object.assign(menuChoose.value, menu);
    console.log(menuChoose.value);
}

async function saveChanges() {
    await menuStore.editMenu(menuChoose.value);
    state.editModal.hide();
    await fetchData()
    editedSuccessfully.value = true;
    reset()
}

function reset() {
    menuChoose.value.id = null;
    menuChoose.value.name = '';
    menuChoose.value.price = '';
    menuChoose.value.detail = '';
    menuChoose.value.image = '';
}

function resetNewMenu() {
    newMenu.value.name = '';
    newMenu.value.price = '';
    newMenu.value.detail = '';
}
</script>

<template>
    <div class="composition">
        <!-- Button trigger modal -->
        <div class="row btn-center">
            <div class="col-3 btn-center mb-5">
                <button 
                    type="button" 
                    class="btn btn-success"
                    @click="openModalAdd" 
                >
                    Add New Menu
                </button>
            </div>
        </div>
        <div v-if="submittedSuccessfully" class="alert alert-success alert-dismissible fade show mb-3" role="alert">
            Menu data added successfully!
            <button type="button" class="btn-close" @click="submittedSuccessfully = false" aria-label="Close"></button>
        </div>
        <div v-if="editedSuccessfully" class="alert alert-success alert-dismissible fade show mb-3" role="alert">
            Menu data updated successfully!
            <button type="button" class="btn-close" @click="editedSuccessfully = false" aria-label="Close"></button>
        </div>

        <div class="row row-cols-1 row-cols-md-3 g-4 mb-5">
            <div v-for="menu in listMakanan">
                <div class="card h-100 border-0" style="width: 18rem;">
                <img :src="menu.image" class="card-img-top img-border img-fluid" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">{{ menu.name }}</h5>
                        <p class="card-text">{{ menu.detail }}</p>
                        <div class="row">
                            <div class="col" style="display: flex; align-items: center;">
                                <h6 class="card-text mb-1">{{ menu.price }}</h6>
                            </div>
                            <div class="col" style="display: flex; justify-content: end;">
                                <button 
                                    type="button" 
                                    class="btn btn-success btn-outline-custom" 
                                    @click="openModalEdit(menu)" 
                                >
                                    Edit Menu
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="card h-100" style="max-width: 540px; height: max-content;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img :src="menu.image" class="img-fluid rounded-start image-size" alt="Gambar Menu">
                        </div>
                        <div class="col-md-8">
                            <div class="card-header bg-cream round-part rounded-0 rounded-end-border header-card">
                                <h6 class="">{{ menu.name }}</h6>
                            </div>
                            <div class="card-body bg-light">
                                <p class="card-text mb-1">{{ menu.detail }}</p>
                                <div class="row">
                                    <div class="col" style="display: flex; align-items: center;">
                                        <h6 class="card-text mb-1">{{ menu.price }}</h6>
                                    </div>
                                    <div class="col" style="display: flex; justify-content: end;">
                                        <button 
                                            type="button" 
                                            class="btn bg-cream " 
                                            @click="openModalEdit(menu)" 
                                        >
                                            Edit Menu
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>

        <!-- Modal Add -->
        <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Add Menu</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form @submit.prevent="addMenu" class="was-validated">
                <div class="modal-body">
                        <div class="row mb-3">
                            <div class="col-6">
                                <label for="menuName" class="form-label text-black">Menu Name</label>
                                <input type="text" class="form-control" id="menuName" v-model="newMenu.name" required>
                                <div class="valid-feedback">Valid.</div>
                                <div class="invalid-feedback">Please fill out Menu Name.</div>
                            </div>
                            <div class="col-6">
                                <label for="menuPrice" class="form-label text-black">Menu Price</label>
                                <input type="text" class="form-control" id="menuPrice" v-model="newMenu.price" required>
                                <div class="valid-feedback">Valid.</div>
                                <div class="invalid-feedback">Please fill out Menu Price.</div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="editMenuPrice" class="form-label text-black">Image Link</label>
                            <input type="text" class="form-control" id="editImageLink" v-model="newMenu.image" required>
                            <div class="valid-feedback">Valid.</div>
                            <div class="invalid-feedback">Please fill out Image Link.</div>
                        </div>
                        <div class="mb-3">
                            <label for="menuDescription" class="form-label text-black">Description</label>
                            <textarea class="form-control" id="menuDescription" rows="3" v-model="newMenu.detail" required></textarea>
                            <div class="valid-feedback">Valid.</div>
                            <div class="invalid-feedback">Please fill out Description.</div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Save changes</button>
                    </div>
                </form>
                </div>
            </div>
        </div>

        <!-- Modal Edit -->
        <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Edit Menu</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form @submit.prevent="saveChanges" class="was-validated">
                <div class="modal-body">
                        <div class="row mb-3">
                            <div class="col-6">
                                <label for="editMenuName" class="form-label text-black">Menu Name</label>
                                <input type="text" class="form-control" id="editMenuName" v-model="menuChoose.name" required>
                                <div class="valid-feedback">Valid.</div>
                                <div class="invalid-feedback">Please fill out Menu Name.</div>
                            </div>
                            <div class="col-6"> 
                                <label for="editMenuPrice" class="form-label text-black">Menu Price</label>
                                <input type="text" class="form-control" id="editMenuPrice" v-model="menuChoose.price" required>
                                <div class="valid-feedback">Valid.</div>
                                <div class="invalid-feedback">Please fill out Menu Price.</div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="editMenuPrice" class="form-label text-black">Image Link</label>
                            <input type="text" class="form-control" id="editImageLink" v-model="menuChoose.image" required>
                            <div class="valid-feedback">Valid.</div>
                                <div class="invalid-feedback">Please fill out Image Link.</div>
                        </div>
                        <div class="mb-3">
                            <label for="editMenuDescription" class="form-label text-black">Description</label>
                            <textarea class="form-control" id="editMenuDescription" rows="3" v-model="menuChoose.detail" required></textarea>
                            <div class="valid-feedback">Valid.</div>
                            <div class="invalid-feedback">Please fill out Description.</div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary" @click="saveChanges">Save changes</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.rounded-end-border {
    border-top-right-radius: var(--bs-border-radius) !important;
}
.bg-cream {
    background-color: #ffe187;
}
.bg-light {
    background-color: #f5f5f5;
}
.header-card {
    display: flex; 
    justify-content: center;
    align-items: center;
}
.btn-outline-custom:hover {
    color: teal; /* Ubah warna teks saat dihover */
    background-color: white; /* Ubah warna latar belakang saat dihover */
    border-color: teal; /* Ubah warna garis pinggir saat dihover */
}
.img-border {
    border-radius: 1% 1% 1% 40%;
}
.btn-center{
    display: flex;
    justify-content: center;
}
</style>