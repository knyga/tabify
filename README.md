tabify
======

```html
<ul id="tabify" class="list-inline navbar-brand">
	<li><a data-tab="true" href="#description">Description</a></li>
	<li><a data-tab="true" href="#prices">Prices</a></li>
	<li><a data-tab="true" href="#comment">Comments</a></li>
	<li><a data-tab="true" href="#image">Images</a></li>
	<li><a data-tab="true" href="#video">Video</a></li>
	<li><a data-tab="true" href="#watch">Watch product</a></li>
</ul>
```

```html
<div class="tcont_tabs row">
	<section id="description">
		<h2>Description content</h2>
	
		<section id="prices">
			<h2>Prices content</h2>
			</section>
	
		<section id="comment">
			<h2>Comments content</h2>
		</section>
	</section>
	
	<section id="image">
		<h2>Images content</h2>
		<ul class="list-inline text-center">
			<li><a class="lightbox" href="http://cdn.vectorstock.com/i/composite/73,11/christmas-sale-vector-1707311.jpg" data-id="1" title="image 1"><img src="http://images.gs-cdn.net/static/albums/120_328444.jpg" alt=""></a></li>
			<li><a class="lightbox" href="http://cdn.vectorstock.com/i/composite/73,11/christmas-sale-vector-1707311.jpg" data-id="2" title="image 2"><img src="http://images.gs-cdn.net/static/albums/120_328444.jpg" alt=""></a></li>
			<li><a class="lightbox" href="http://cdn.vectorstock.com/i/composite/73,11/christmas-sale-vector-1707311.jpg" data-id="3" title="image 3"><img src="http://images.gs-cdn.net/static/albums/120_328444.jpg" alt=""></a></li>
		</ul>
	</section>
	
	<section id="video">
		<h2>Video content</h2>
	</section>
	
	<section id="watch">
		<h2>Watch product</h2>
	</section>
</div>
```

```javascript
$('#tabify').tabify({
	/**
	 * scroll animation time
	 * @type {Number}
	 */
	scrollTime: 500,
	/**
	 * active className
	 * @type {String}
	 */
	activeClass: 'active'
};
});
```
