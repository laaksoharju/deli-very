/*jslint es5:true, indent: 2 */
/*global sharedVueStuff, Vue, socket */
'use strict';
var socket = io();

var vm = new Vue({
  el: '#dots',
  data: {
    orders: {},
  },
  created: function () {
    socket.on('initialize', function (data) {
      this.orders = data.orders;
    }.bind(this));

    socket.on('currentQueue', function (data) {
      this.orders = data.orders;
    }.bind(this));
  },
  methods: {
    getNext: function () {
      var lastOrder = Object.keys(this.orders).reduce( function (last, next) {
        return Math.max(last, next);
      }, 0);
      return lastOrder + 1;
    },
    addOrder: function (event) {
      socket.emit("addOrder", { orderId: this.getNext(), 
                                details: { x: event.pageX-10, 
                                           y: event.pageY-10 },
                                orderItems: ["Beans", "Curry"]
                              });
    }
  }
});
