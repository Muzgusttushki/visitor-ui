<template>
  <el-container class="layouts sign-in">
    <div v-loading="loading" class="sign-in panel-form">
      <div class="label">
        Авторизация
      </div>
      <el-form
        v-model="userForms"
        label-position="top"
        label-width="100px"
        @submit.native="handleSignIn"
      >
        <el-form-item label="Логин">
          <el-input
            v-model="userForms.username"
            placeholder="username@weekendagency.ru"
          />
        </el-form-item>
        <el-form-item label="Пароль">
          <el-input
            v-model="userForms.password"
            placeholder="******"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button native-type="submit" type="primary">
            Войти
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-container>
</template>
<script>
    export default {
      layout: 'account',
        middleware: 'roles/none',
        data() {
            return {
                userForms: {
                    username: null,
                    password: null
                },

                loading: false
            }
        },
        methods: {
            async handleSignIn(e) {
                if (e) {
                    e.preventDefault();
                    this.loading = true
                }

                const message = await this.$store.dispatch('account/signIn', {
                    access: await new Promise((resolve) => {
                        // eslint-disable-next-line no-undef
                        grecaptcha.ready(function () {
                            // eslint-disable-next-line no-undef
                            grecaptcha
                                .execute('6LeNarYUAAAAAKOEIIh4xnQ7jt1BB7zloMq6CErs', {
                                    action: 'account_signup'
                                })
                                .then((offset) => {
                                    if (offset) {
                                        return resolve(offset)
                                    }
                                })
                        })
                    }),

                    ...this.userForms
                });

                this.$nextTick(() => {
                    this.loading = false
                });

                return this.$notify({...message})
            }
        }
    }
</script>
