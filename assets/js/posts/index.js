/** @jsx React.DOM */
var React = require('react'),
    $     = require('jquery'),

    Item  = require('./item'),

    List;

List = React.createClass({
    getInitialState: function () {
        return { posts: [] };
    },
    componentWillMount: function () {
        this.fetchLatestNews();
    },
    fetchLatestNews: function () {
        $.ajax({
            url:       'http://api.ihackernews.com/page',
            dataType:  'jsonp',
            data:      { format: 'jsonp' },
            success: function (result) {
                this.setState({ posts: result.items });
            }.bind(this),
            error: function () {
                alert('error getting posts. please try again later');
            }
        });
    },
    render: function () {
        return <ol className="posts">
            {this.state.posts.map(function (post) {
                return <Item key={post.id} post={post}/>
            })}
        </ol>;
    }
});

module.exports = List;
