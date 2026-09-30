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
- The `coming-soon` channel in Experience is a stand-in. Replace it with a real role, or keep it as is. `badge` adds a small label next to a channel's title.

Some sites refuse to be embedded (they send `X-Frame-Options` or a CSP `frame-ancestors` header). If a frame stays blank, that site blocks it. The **Open** button always works.

## Things to know

- Every page and channel has its own address: `#/experience`, `#/projects`, `#/verbatim`, `#/resume`, `#/contact`. The browser's Back button and Esc both step back one screen.
- Press Esc to close a channel. If you've clicked inside an embedded site, the keyboard belongs to that site until you click outside it, so use the X button or the Home button instead.
- Motion turns itself down for visitors who have "reduce motion" switched on in their system settings.
- Photos in `assets/` had their location metadata stripped. Do the same for any new photos before publishing them.
- `assets/ethics-essay.pdf` is still in the folder but is not linked from anywhere. Delete it or add a channel for it.
- Earlier versions are kept in `_archive/` (`retro-v1`, `wii-v1`). It's listed in `.gitignore`, so it is never pushed to GitHub. Delete the folder whenever you like.

## Files

```
index.html               page shell
css/style.css            all styling and animation
js/content.js            your content (edit this)
js/main.js               intro page, sections, channels, routing
demos/placeholder.html   stand-in screen for an embed you haven't filled in
assets/                  photos, PDFs, favicon
```

## Live site

https://sidrao4.github.io/portfolio/ (GitHub Pages, served from the `main` branch of https://github.com/sidrao4/portfolio).

## Update the site

Edit `js/content.js` (or anything else), then push. GitHub rebuilds in about a minute.

```
git add -A
git commit -m "Update content"
git push
```

The commits in this repo use your GitHub no-reply email address, so your real address isn't published in the history.

## Make it your main address (optional)

Your old portfolio is still live at https://sidrao4.github.io/, served from the `sidrao4.github.io` repo. To put this site there instead, either copy these files into that repo and push, or rename that repo to something like `old-portfolio` and rename this one to `sidrao4.github.io`. Every link in the site is relative, so it works from either address.
