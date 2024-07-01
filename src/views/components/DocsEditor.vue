<script>
</script>


<template>
  <div class="card">
    <div class="card-header card-position pb-0">
      <h6>Список документов</h6>
      <div class = "">
        <div id="app">
          <button v-on:click="increase(3, $event)">Создать новый документ</button>
          <div>{{modalwindow}}</div>
          </div>
      </div>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Наименование документа
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Тема
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Состояние
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Дата
              </th>
              <th class="text-center text-uppercase text-xxs font-weight-border opacity-7 text-secondary opacity-7">
              </th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
