<h1 align="center" style="border-bottom: none;">❄️ @akashrajpurohit/snowflake-id</h1>
<h3 align="center">A simple and lightweight Node.js library to generate unique snowflake IDs.</h3>
<br />
<p align="center">
  <a href="https://github.com/AkashRajpurohit/snowflake-id/actions/workflows/release.yml">
    <img alt="Build states" src="https://github.com/AkashRajpurohit/snowflake-id/actions/workflows/release.yml/badge.svg?branch=main">
  </a>
  <a href="https://www.npmjs.com/package/@akashrajpurohit/snowflake-id">
    <img alt="npm latest version" src="https://img.shields.io/npm/v/@akashrajpurohit/snowflake-id/latest.svg">
  </a>
  <a href="https://www.npmjs.com/package/@akashrajpurohit/snowflake-id">
    <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/@akashrajpurohit/snowflake-id">
  </a>
  <a href="https://www.npmjs.com/package/@akashrajpurohit/snowflake-id">
    <img alt="NPM license" src="https://img.shields.io/npm/l/@akashrajpurohit/snowflake-id">
  </a>
  <img alt="Visitors count" src="https://visitor-badge.laobi.icu/badge?page_id=@akashrajpurohit~snowflake-id.visitor-badge&style=flat-square&color=0088cc">
  <a href="https://twitter.com/akashwhocodes">
    <img alt="follow on twitter" src="https://img.shields.io/twitter/follow/akashwhocodes.svg?style=social&label=@akashwhocodes">
  </a>

  <p align="center">
    <a href="https://github.com/AkashRajpurohit/snowflake-id/issues/new?template=bug_report.md">Bug report</a>
    ·
    <a href="https://github.com/AkashRajpurohit/snowflake-id/issues/new?template=feature_request.md">Feature request</a>
  </p>
</p>
<br />
<hr />

`@akashrajpurohit/snowflake-id` is a Node.js library for generating unique and distributed IDs that are suitable for use as primary keys in distributed systems.

It generates 64-bit IDs (in string format) that are composed of a timestamp, a worker ID, and a sequence number. These IDs are based on [Twitter's Snowflake ID](https://github.com/twitter-archive/snowflake/tree/snowflake-2010) generation algorithm.

## Installation 🚀

You can install `@akashrajpurohit/snowflake-id` using pnpm/npm/yarn:

```bash
pnpm add @akashrajpurohit/snowflake-id

# OR

npm install @akashrajpurohit/snowflake-id

# OR

yarn add @akashrajpurohit/snowflake-id
```

## Usage 💻

Here's an example of how to use `@akashrajpurohit/snowflake-id`:

```javascript
const { SnowflakeId } = require('@akashrajpurohit/snowflake-id');

const snowflake = SnowflakeId({
  workerId: 1,
  nodeIdBits: 10,
  sequenceBits: 12,
  epoch: 1683982358000,
});

console.log(snowflake.generate()); // 14755887168818983731200
```

This will generate a unique ID in string format.

## Configuration options ⚙️

The SnowflakeId constructor takes an options object with the following properties:

- `workerId` (optional): A number between 0 and (2^`nodeIdBits`)-1 that represents the ID of the worker generating the IDs.
	Defaults to 0 if not specified.
- `nodeIdBits` (optional): The number of bits used to represent the worker ID.
	Defaults to 10 if not specified.
- `sequenceBits` (optional): The number of bits used to represent the sequence number.
	Defaults to 12 if not specified.
- `epoch` (optional): A timestamp in milliseconds representing the start of the ID generation.
	Defaults to January 1, 1970 at 00:00:00 UTC if not specified.

## Methods 🧮

The SnowflakeId instance has the following methods:

- `generate()`: Generates a unique ID in string format.

## Error Handling 😱

The SnowflakeId instance throws an error if the clock moves backwards, i.e., if the current timestamp is less than the last timestamp.

This can happen if the system clock is adjusted manually or if the system clock drifts significantly.

If this happens, the library throws an Error with the message `Clock is moving backwards!`.

## Examples 🔠

Here's an example of how to generate 10 IDs:

```javascript
const { SnowflakeId } = require('@akashrajpurohit/snowflake-id');

const snowflake = SnowflakeId();

for (let i = 0; i < 10; i++) {
  console.log(snowflake.generate());
}
```

And here's an example of how to generate IDs using different worker IDs:

```javascript
const { SnowflakeId } = require('@akashrajpurohit/snowflake-id');

const worker1 = SnowflakeId({ workerId: 1 });
const worker2 = SnowflakeId({ workerId: 2 });

console.log(worker1.generate()); // Generates an ID with worker ID 1
console.log(worker2.generate()); // Generates an ID with worker ID 2
```

## Bugs or Requests 🐛

If you encounter any problems feel free to open an [issue](https://github.com/AkashRajpurohit/snowflake-id/issues/new?template=bug_report.md). If you feel the project is missing a feature, please raise a [ticket](https://github.com/AkashRajpurohit/snowflake-id/issues/new?template=feature_request.md) on GitHub and I'll look into it. Pull requests are also welcome.

## Where to find me? 👀

- [Website](https://akashrajpurohit.com/)
- [Linkedin](https://www.linkedin.com/in/AkashRajpurohit)
- [Instagram](https://www.instagram.com/akashwho.codes)
- [Twitter](https://www.twitter.com/akashwhocodes)
