# [Loader](https://yfill.cn/loader)

[![GitHub license][mit]][mit-url]
[![Code Style][code-style]][code-style-url]
[![NPM Package][npm]][npm-url]
[![Monthly Downloads][md]][md-url]
[![Build Size][build-size]][build-size-url]
[![Dependencies Status][dependencies-status]][dependencies-status-url]
[![DevDependencies Status][dev-dependencies-status]][dev-dependencies-status-url]

A loader that loads modules asynchronously on demand.

## Install

using npm:

```sh
npm install @yfill/loader --save
```

or using yarn:

```sh
yarn add @yfill/loader
```

## Usage

- Import resources and use create method to create loader.

  ```js
  import Loader from '@yfill/loader';
  const loader = Loader.create();
  ```

  ```html
  <script src="https://unpkg.com/@yfill/loader"></script>
  <script>
    const loader = Loader.create();
  </script>
  ```

- Get corresponding resources.

  using Promise:

  ```js
  loader('dayjs').then((dayjs) => {
    console.log(dayjs);
  });
  ```

  using async/await:

  ```js
  (async function run() {
    const dayjs = await loader('dayjs');
    console.log(dayjs);
  })();
  ```

  load components in vue:

  ```html
  <div id="template">
    <h3>Vue-multiselect</h3>
    <multiselect 
      v-model="value" 
      :options="options"></multiselect>
    <h3>Vue.Draggable(dragging: {{drag}})</h3>
    <draggable
      v-model="myArray"
      group="people"
      @start="drag=true"
      @end="drag=false"
    >
      <div 
        v-for="element in myArray" 
        :key="element.id"
      >
        {{element.name}}
      </div>
    </draggable>
  </div>
  <script>
    const loader = Loader.create({
      libAliasMap: {
        'vue-multiselect': [
          'vue-multiselect/dist/vue-multiselect.min.js', 
          'vue-multiselect/dist/vue-multiselect.min.css'
        ]
      }
    });
    const { vueComponentLoad: loadCom } = loader;
    (async function run() {
      // const Vue = await loader('vue');
      const Vue = await loader('vue@2.6.14');
      Vue.use(loader);
      new Vue({
        components: {
          Multiselect: loadCom('vue-multiselect'),
          Draggable: loadCom('vuedraggable'),
        },
        data() {
          return {
            drag: false,
            value: null,
            options: ['list', 'of', 'options'],
            myArray: [
              { id: '1', name: 'Tom' },
              { id: '2', name: 'Jerry' },
              { id: '3', name: 'Carry' },
            ],
          };
        },
        async created() {
          const dayjs = await this.$loader('dayjs');
          console.log(dayjs().toString());
        },
      }).$mount('#template');
    })();
  </script>
  ```

[mit]: https://img.shields.io/badge/license-MIT-blue.svg
[mit-url]: https://github.com/Yfill/loader/blob/main/LICENSE
[code-style]: https://img.shields.io/badge/code_style-airbnb-brightgreen
[code-style-url]: https://www.npmjs.com/package/eslint-config-airbnb
[md]: https://badgen.net/npm/dm/@yfill/loader
[md-url]: https://npmcharts.com/compare/@yfill/loader?minimal=true
[npm]: https://img.shields.io/npm/v/@yfill/loader.svg
[npm-url]: https://www.npmjs.com/package/@yfill/loader
[build-size]: https://badgen.net/bundlephobia/minzip/@yfill/loader
[build-size-url]: https://bundlephobia.com/result?p=@yfill/loader
[dependencies-status]: https://david-dm.org/Yfill/loader/status.svg
[dependencies-status-url]: https://david-dm.org/Yfill/loader
[dev-dependencies-status]: https://david-dm.org/Yfill/loader/dev-status.svg
[dev-dependencies-status-url]: https://david-dm.org/Yfill/loader?type=dev
