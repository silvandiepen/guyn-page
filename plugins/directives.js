import Vue from 'vue';
// import Ratio from '@sil/ratio';
import Trigger from '@sil/scroll-trigger';
import Parallax from '@sil/scroll-parallax';
// import ScrollMenu from '@sil/scroll-menu';
// import Pointer from '@sil/pointer';
// import scrollTo from '@sil/scrollto';
// import Markdown from '@sil/markdown';

const Directives = {
	// Ratio,
	Trigger,
	Parallax
	// Markdown,
	// ScrollMenu
	// Pointer
	// scrollTo
};

Object.keys(Directives).forEach((key) => {
	Vue.directive(key, Directives[key]);
});
