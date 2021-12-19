# octoverse

An offline version of <https://octoverse.github.com/>.

## NOTICE

I quit this project because git octoverse 2021 was too difficult to get an offline version due to the base technologies it used are very unfriendly to debug and recover. It use `next.js`, `sweltejs`, and also many other magic technologies.

Maybe someday I dive into the `next.js` framework, I'll find another way.

## Online

- <http://xovel.cn/octoverse/2020>
- <http://xovel.cn/octoverse/2019>
- <http://xovel.cn/octoverse/2018>
- <http://xovel.cn/octoverse/2017>
- <http://xovel.cn/octoverse/2016>

## Usage

Git:

```
git clone git@github.com:xovel/octoverse.git
```

or

Download <https://github.com/xovel/octoverse/archive/gh-pages.zip>

Run `index.html` in a modern browser, e.g. Chrome/Firefox/Edge.

## Change

### 2019

- Commented `Global Site Tag (gtag.js) - Google Analytics`.
- Fix encoding error about `&#65279;`.

### 2018

- Commented `Global Site Tag (gtag.js) - Google Analytics`.

### 2017

- Commented `Global Site Tag (gtag.js) - Google Analytics`.
- Use `DEV-SRC` of `jquery`, `jquery.waypoints.js`, `rellax.js`.
- Did not using offline data about `mapbox` data, so it is not a truely offline version.

### 2016

- `GA`(Google Analytics) code has been commented out.
- `Gauges` analytics is also the same.
- Format `all.css` and `all.js`. Pretty printed by Chrome Dev Tools.
