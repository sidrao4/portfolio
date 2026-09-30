# Sidharth Rao: portfolio

An intro page with four big buttons (Experience, Projects, Resume, Contact) and a menu-of-channels look. Plain HTML, CSS and JavaScript. No build step, no dependencies.

## Preview

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Edit your content

Everything comes from **`js/content.js`**. The comments at the top explain every field.

- `intro` is the front page: photo, bio, skill chips, and the words that rotate after "I build".
- `nav` is the four big buttons. `sections` holds the Experience and Projects pages. `resume` is the Resume channel.
- Each channel's `media` is what shows on the big screen: a live website, a PDF, a photo, or `null` for a "coming soon" screen.
- A tall image such as a poster can use `fit: "scroll"` so it fills the screen width and scrolls (MicroCART does this).
- Anything with `url: ""` shows as a dashed "add link" button until you fill it in.
- `role-placeholder` and `job-aggregator` are marked as placeholders. Fill them in and set `placeholder: false` (or delete the line).

Some sites refuse to be embedded (they send `X-Frame-Options` or a CSP `frame-ancestors` header). If a frame stays blank, that site blocks it. The **Open** button always works.

## Things to know

- Every page and channel has its own address: `#/experience`, `#/projects`, `#/verbatim`, `#/resume`, `#/contact`. The browser's Back button and Esc both step back one screen.
- Motion turns itself down for visitors who have "reduce motion" switched on in their system settings.
- Photos in `assets/` had their location metadata stripped. Do the same for any new photos before publishing them.
- `assets/ethics-essay.pdf` is still in the folder but is not linked from anywhere. Delete it or add a channel for it.
- Earlier versions are kept in `_archive/` (`retro-v1`, `wii-v1`). Delete that folder whenever you like.

## Files

```
index.html               page shell
css/style.css            all styling and animation
js/content.js            your content (edit this)
js/main.js               intro page, sections, channels, routing
demos/placeholder.html   stand-in screen for an embed you haven't filled in
assets/                  photos, PDFs, favicon
```

## Deploy

It's a static site. Drag the folder onto Netlify, Vercel or Cloudflare Pages, or push it to GitHub Pages. Remove `_archive/` first if you don't want old versions published.
