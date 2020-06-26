<template>
  <footer class="page-footer">
    <div class="footer-copyright">
      <div class="container white-text flex">
        © 2020 {{ "Oksana_Bobrovich" | localize }}
        <div>
          {{ "footer_info_string" | localize }}
          <a
            class="white-text text-lighten-4 right"
            href="https://www.nbrb.by/api/exrates/currencies!"
          >
            https://www.nbrb.by/api/exrates/currencies</a
          >
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style>
.container {
  width: 80%;
  margin: 0 auto;
}
.flex {
  display: flex;
  justify-content: space-between;
}
.page-footer {
  padding-top: 0 !important;
}
</style>
