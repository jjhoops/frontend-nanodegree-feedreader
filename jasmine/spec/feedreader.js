// feedreader.js

$(function() {
    // Tests to check that the RSS Feeds requested exist, have names and URLS
    describe('RSS Feeds', () => {

        it('Feed array is defined and not empty', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('Feed URLs are defined and not empty', () => {
            allFeeds.forEach(feed => {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        it('Feed Names are defined and not empty', () => {
            allFeeds.forEach(feed => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });
    // Tests to check the Menu functioning works properly -- that it is accessible when clicked
    describe('The menu', () => {

        it('Menu is hidden by default', () => {
            let menuHidden = $('body').hasClass('menu-hidden');
            expect(menuHidden).toBe(true);
        });
        // Clicks the Menu icon to confirm that class changes -- defines whether it is displayed
        it('Menu becomes visible and invisible as icon is clicked', () => {
            let menuButton = $('a.menu-icon-link');
            menuButton.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            menuButton.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });
    // Tests to check that the feeds have entries
    describe('Initial Entries', () => {

        beforeEach(done => {
            loadFeed(0, done);
        });

        it('loadFeed contains at least one entry', () => {
            expect($(".feed .entry").length).toBeGreaterThan(0);
        });
    });
    // Tests to confirm that new loadFeed call changed the content
    describe('New Feed Selection', () => {
        let firstFeed = "";
        let secondFeed = "";
        // Compares the innerText from first element of two loadFeed calls
        beforeEach(done => {
            loadFeed(0);
            firstFeed = document.querySelector('.feed').children[0].innerText;
            loadFeed(1, () => {
                secondFeed = document.querySelector('.feed').children[0].innerText;
                done();
            });
        });
        it('New loadFeed actually changes the content', () => {
            expect(firstFeed === secondFeed).toBe(false);
        });
    });
}());