<template>
	<form @submit.prevent="submit(form)">
		<div class="input-wrapper">
			<label for="email">E-Mail:</label>
			<input required v-model="form.email" type="email" name="email" />
		</div>
		<div class="input-wrapper">
			<label for="name">Name</label>
			<input required v-model="form.name" type="text" name="name" />
		</div>
		<div class="input-wrapper">
			<label for="subject">Betreff</label>
			<input v-model="form.subject" type="text" name="subject" />
		</div>
		<div class="input-wrapper">
			<label for="message">Nachricht</label>
			<textarea
				required
				v-model="form.message"
				type="text"
				name="message"></textarea>
		</div>
		<button type="submit">
			<template v-if="waiting">Laden</template>
			<template v-if="!waiting">Abschicken</template>
		</button>
		<p v-if="errors">🔥 Etwas lief schief.</p>
		<p v-if="succsess">📩 Abgeschickt!</p>
	</form>
</template>

<script setup>
const form = ref({
	name: '',
	email: '',
	subject: '',
	message: '',
});

const errors = ref(false);
const succsess = ref(false);
const waiting = ref(false);

async function submit(form) {
	this.waiting = true;
	await $fetch('http://localhost:3000/api/contact', {
		method: 'POST',
		body: form,
	})
		.then(() => {
			this.errors = false;
			this.succsess = true;
			this.waiting = false;
			this.form = {
				name: '',
				email: '',
				subject: '',
				message: '',
			};
		})
		.catch(() => {
			this.errors = true;
			this.succsess = false;
			this.waiting = false;
		});
}
</script>

<style lang="scss" scoped>
form {
	width: 30rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	.input-wrapper {
		display: flex;
		flex-direction: column;
		width: 100%;
		label {
			font-size: 1rem;
		}
		input,
		textarea {
			border: none;
			border-radius: 0.5rem;
			margin: 0.2rem 0 0 0;
			background-color: rgba($ciWhite, 0.05);
			padding: 1rem;
			color: $ciWhite;
		}
		textarea {
			min-height: 10rem;
		}
	}
	button {
		border: none;
		padding: 1rem;
		border-radius: 0.5rem;
		background-color: $ciBlue;
		color: $ciSecond;
	}
}
</style>
