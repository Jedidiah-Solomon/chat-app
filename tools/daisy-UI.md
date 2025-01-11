https://daisyui.com/

The most popular component library for Tailwind CSS.

In a Tailwind CSS project, you need to write utility class names for every element. Thousands of class names just to style the most basic elements.

Tailwind only

```
<div class="w-80 rounded-2xl bg-gray-100">
  <div class="flex flex-col gap-2 p-8">
    <input placeholder="Email" class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-100" />
    <label class="flex cursor-pointer items-center justify-between p-1">
      Accept terms of use
      <div class="relative inline-block">
        <input type="checkbox" class="peer h-6 w-12 cursor-pointer appearance-none rounded-full border border-gray-300 bg-white checked:border-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2" />
        <span class="pointer-events-none absolute start-1 top-1 block h-4 w-4 rounded-full bg-gray-400 transition-all duration-200 peer-checked:start-7 peer-checked:bg-gray-900"></span>
      </div>
    </label>
    <label class="flex cursor-pointer items-center justify-between p-1">
      Submit to newsletter
      <div class="relative inline-block">
        <input type="checkbox" class="peer h-6 w-12 cursor-pointer appearance-none rounded-full border border-gray-300 bg-white checked:border-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2" />
        <span class="pointer-events-none absolute start-1 top-1 block h-4 w-4 rounded-full bg-gray-400 transition-all duration-200 peer-checked:start-7 peer-checked:bg-gray-900"></span>
      </div>
    </label>
    <button class="inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95">Save</button>
  </div>
</div>
```

VS

Tailwind + daisyUI

```
<div class="card bg-base-200 w-80">
  <div class="card-body">
    <input placeholder="Email" class="input input-bordered" />
    <label class="label cursor-pointer">
      Accept terms of use
      <input type="checkbox" class="toggle" />
    </label>
    <label class="label cursor-pointer">
      Submit to newsletter
      <input type="checkbox" class="toggle" />
    </label>
    <button class="btn btn-neutral">Save</button>
  </div>
</div>
```

1. Install `npm i -D daisyui@latest`
2. Add daisyUI to tailwind.config.js:

ES6

```import daisyui from "daisyui"
export default {
  //...
  plugins: [
    daisyui,
  ],
}
```

or

CJS

```
module.exports = {
  //...
  plugins: [
    require('daisyui'),
  ],
}
```
