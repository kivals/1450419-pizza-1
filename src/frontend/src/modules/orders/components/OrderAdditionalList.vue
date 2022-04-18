<template>
  <ul class="order__additional">
    <li>
      <img
        src="@/assets/img/cola.svg"
        width="20"
        height="30"
        alt="Coca-Cola 0,5 литра"
      />
      <p>
        <span>Coca-Cola 0,5 литра</span>
        <b>56 ₽</b>
      </p>
    </li>
    <li>
      <img
        src="@/assets/img/sauce.svg"
        width="20"
        height="30"
        alt="Острый соус"
      />
      <span>Острый соус <br />30 ₽</span>
    </li>
    <li>
      <img
        src="@/assets/img/potato.svg"
        width="20"
        height="30"
        alt="Картошка из печи"
      />
      <p>
        <span>Картошка из печи</span>
        <b>170 ₽</b>
      </p>
    </li>
  </ul>
</template>

<script>
export default {
  name: "OrderAdditionalList",
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";

.order__additional {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-bottom: 5px;
  padding-left: 80px;

  li {
    @include b-s11-h16;

    width: 130px;
    margin-right: 24px;
    margin-bottom: 10px;
  }

  p {
    margin: 0;
  }

  img {
    float: left;

    margin-right: 7px;
  }

  b {
    display: block;
  }
}
</style>
