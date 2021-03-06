﻿/**
 * 批量下載 塔多漫画网 的工具。 Download taduo comics.
 */

'use strict';

require('../work_crawler_loader.js');

// ----------------------------------------------------------------------------

CeL.run('application.net.work_crawler.sites.qTcms2014');

// ----------------------------------------------------------------------------

var crawler = CeL.qTcms2014({
	base_URL : 'http://www.taduo.net/',

	/**
	 * 遇到下架章節時圖片會顯示 http://mh.lianzhixiu.com/2018/03/14/pb.jpg
	 * 
	 * <code>
	  <div id="section">
	  <div class="wp">  <div class="mh_tsw2"><div class="mh_ts2" style="color:#f40;font-size: 15px;">  <b>蓝翅漫画</b>中因为版权或其他问题，我们将对所有章节进行屏蔽！</div>    </div></div>
	  </div>
	</code>
	 */
	is_limited_image_url : function(image_url) {
		return image_url.endsWith('2018/03/14/pb.jpg');
	},
	postfix_chapter_data : function(chapter_data, work_data) {
		// 遇到下架章節避免下載到下架圖片。
		if (chapter_data.image_list.some(this.is_limited_image_url)) {
			chapter_data.limited = true;
			if (chapter_data.image_list.every(this.is_limited_image_url)) {
				// chapter_data.image_count 似乎全部都是 3
				// chapter_data.image_length = chapter_data.image_list.length;
				delete chapter_data.image_list;
			}
		}
	}
});

// ----------------------------------------------------------------------------

// CeL.set_debug(3);

start_crawler(crawler, typeof module === 'object' && module);
