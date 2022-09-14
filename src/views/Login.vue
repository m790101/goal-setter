<template>
    <section class="login">
    <h2 class="mt-5 text-center">帳號登入</h2>
    <form action="/user/login" method="POST" class="mt-3">
        <div class="mb-3">
            <label for="email" class="form-label">Email:</label>
            <input type="email" class="form-control" id="email" name="email" aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">密碼：</label>
            <input type="password" class="form-control" id="password" name="password">
        </div>
        <div class="mt-5">
            <button type="submit" class="btn login__btn">送出</button>
        </div>

    </form>
    <div class="d-flex flex-row-reverse mt-3">
        <router-link to="/user/register" class="text-primary">註冊帳號</router-link>
    </div>

</section>
</template>


<script>
export default {
    
}
</script>


<style lang="scss" scoped>
.login {
    width:50%;
    margin: 0 auto;

    &__btn{
        background-color: #E06B16; 
        color:white; 
        width:100%;
        
        &:hover{
            background-color: #c25a0f;
            color:white; 
        }
    }
}
</style>