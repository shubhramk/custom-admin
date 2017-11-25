import {Component, AfterViewInit, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ConstantConfig} from "../../common/config/constant.config";

import chartist from 'chartist';
//declare var Chartist:any;
import {LocalStorageService} from "../../common/services/local-storage.service";
import {AuthService} from "../../common/services/auth.service";
import {Broadcaster} from "../../common/services/broadcaster.service";
declare var $:any;

@Component({
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit,AfterViewInit{
  visibleElement:boolean = false
  loggedInUserName:string = '';
  loggedInUserImg:string  = '';

  constructor(
    private router:Router,
    private authService:AuthService,
    private broadcaster:Broadcaster,
    private localStorage:LocalStorageService
  ) {}

  ngOnInit(){
    setTimeout(()=>this.initJS(),500);
    let userDetail = this.localStorage.get(ConstantConfig.USER_DETAIL);
    this.loggedInUserName = userDetail ? JSON.parse(userDetail)['name'] : '';
    this.loggedInUserImg  = userDetail ? JSON.parse(userDetail)['img'] : '';
    
  }

  ngAfterViewInit(){
    //registerLoaderEvents
    this.broadcaster.on<string>('SHOW_LOADER')
      .subscribe(message => {
        console.log(message);
        if(!message){
          $(".preloader").fadeOut();
        }else{
          $(".preloader").fadeIn();
        }

      });

  }

  //navigate to page
  navigateTo(url:string){
    this.visibleElement = false;
    ConstantConfig.visibleElement = this.visibleElement;
    this.broadcaster.broadcast('ROUTE_URL',url);
    this.router.navigate([url]);
  }

  //logout
  logOut(){
    this.authService.logout();
  }

  initJS(){

    $(function () {
      "use strict";
      $(function () {
        //$(".preloader").fadeOut();
      });
      $(document).on('click', '.mega-dropdown', function (e) {
        e.stopPropagation()
      });
      // ==============================================================
      // This is for the top header part and sidebar part
      // ==============================================================
      var set = function () {
        var width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width;
        var topOffset = 70;
        if (width < 1170) {
          $("body").addClass("mini-sidebar");
          $('.navbar-brand span').hide();
          $(".scroll-sidebar, .slimScrollDiv").css("overflow-x", "visible").parent().css("overflow", "visible");
          $(".sidebartoggler i").addClass("ti-menu");
        }
        else {
          $("body").removeClass("mini-sidebar");
          $('.navbar-brand span').show();
          $(".sidebartoggler i").removeClass("ti-menu");
        }

        var height = ((window.innerHeight > 0) ? window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
          $(".page-wrapper").css("min-height", (height) + "px");
        }

      };
      $(window).ready(set);
      $(window).on("resize", set);
      // ==============================================================
      // Theme options
      // ==============================================================
      $(".sidebartoggler").on('click', function () {
        if ($("body").hasClass("mini-sidebar")) {
          $("body").trigger("resize");
          $(".scroll-sidebar, .slimScrollDiv").css("overflow", "hidden").parent().css("overflow", "visible");
          $("body").removeClass("mini-sidebar");
          $('.navbar-brand span').show();
          $(".sidebartoggler i").addClass("ti-menu");
        }
        else {
          $("body").trigger("resize");
          $(".scroll-sidebar, .slimScrollDiv").css("overflow-x", "visible").parent().css("overflow", "visible");
          $("body").addClass("mini-sidebar");
          $('.navbar-brand span').hide();
          $(".sidebartoggler i").removeClass("ti-menu");
        }
      });
      // topbar stickey on scroll

      $(".fix-header .topbar").stick_in_parent({

      });


      // this is for close icon when navigation open in mobile view
      $(".nav-toggler").click(function () {
        $("body").toggleClass("show-sidebar");
        $(".nav-toggler i").toggleClass("ti-menu");
        $(".nav-toggler i").addClass("ti-close");
      });
      $(".sidebartoggler").on('click', function () {
        $(".sidebartoggler i").toggleClass("ti-menu");
      });
      // ==============================================================
      // Right sidebar options
      // ==============================================================
      $(".right-side-toggle").click(function () {
        $(".right-sidebar").slideDown(50);
        $(".right-sidebar").toggleClass("shw-rside");

      });

      // ==============================================================
      // Auto select left navbar
      // ==============================================================
      $(function () {
        var url = window.location;
        var element = $('ul#sidebarnav a').filter(function () {
          return this.href == url;
        }).addClass('active').parent().addClass('active');
        while (true) {
          if (element.is('li')) {
            element = element.parent().addClass('in').parent().addClass('active');
          }
          else {
            break;
          }
        }

      });
      // ==============================================================
      //tooltip
      // ==============================================================
      $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      })
      // ==============================================================
      //Popover
      // ==============================================================
      $(function () {
        $('[data-toggle="popover"]').popover()
      })
      // ==============================================================
      // Sidebarmenu
      // ==============================================================
      $(function () {
        $('#sidebarnav').metisMenu();
      });
      // ==============================================================
      // Slimscrollbars
      // ==============================================================
      $('.scroll-sidebar').slimScroll({
        position: 'left'
        , size: "5px"
        , height: '100%'
        , color: '#dcdcdc'
      });
      $('.message-center').slimScroll({
        position: 'right'
        , size: "5px"

        , color: '#dcdcdc'
      });


      $('.aboutscroll').slimScroll({
        position: 'right'
        , size: "5px"
        , height: '80'
        , color: '#dcdcdc'
      });
      $('.message-scroll').slimScroll({
        position: 'right'
        , size: "5px"
        , height: '570'
        , color: '#dcdcdc'
      });
      $('.chat-box').slimScroll({
        position: 'right'
        , size: "5px"
        , height: '470'
        , color: '#dcdcdc'
      });

      $('.slimscrollright').slimScroll({
        height: '100%'
        , position: 'right'
        , size: "5px"
        , color: '#dcdcdc'
      });

      // ==============================================================
      // Resize all elements
      // ==============================================================
      $("body").trigger("resize");
      // ==============================================================
      // To do list
      // ==============================================================
      $(".list-task li label").click(function () {
        $(this).toggleClass("task-done");
      });

      // ==============================================================
      // Login and Recover Password
      // ==============================================================
      $('#to-recover').on("click", function () {
        $("#loginform").slideUp();
        $("#recoverform").fadeIn();
      });

      // ==============================================================
      // Collapsable cards
      // ==============================================================
      $(document).on("click", ".card-actions a", function(e) {
        if (e.preventDefault(), $(this).hasClass("btn-close")) $(this).parent().parent().parent().fadeOut();
      });

      (function ($, window, document) {
        var panelSelector = '[data-perform="card-collapse"]';
        $(panelSelector).each(function () {
          var $this = $(this)
            , parent = $this.closest('.card')
            , wrapper = parent.find('.card-block')
            , collapseOpts = {
            toggle: false
          };
          if (!wrapper.length) {
            wrapper = parent.children('.card-heading').nextAll().wrapAll('<div/>').parent().addClass('card-block');
            collapseOpts = {toggle: true};
          }
          wrapper.collapse(collapseOpts).on('hide.bs.collapse', function () {
            $this.children('i').removeClass('ti-minus').addClass('ti-plus');
          }).on('show.bs.collapse', function () {
            $this.children('i').removeClass('ti-plus').addClass('ti-minus');
          });
        });
        $(document).on('click', panelSelector, function (e) {
          e.preventDefault();
          var parent = $(this).closest('.card');
          var wrapper = parent.find('.card-block');
          wrapper.collapse('toggle');
        });
      }($, window, document));
    });


      var CalendarApp = function() {
          this.$body = $("body")
          this.$calendar = $('#calendar'),
          this.$event = ('#calendar-events div.calendar-events'),
          this.$categoryForm = $('#add-new-event form'),
          this.$extEvents = $('#calendar-events'),
          this.$modal = $('#my-event'),
          this.$saveCategoryBtn = $('.save-category'),
          this.$calendarObj = null;
      };


      /* on drop */
      CalendarApp.prototype.onDrop = function (eventObj, date) {
          var $this = this;
              // retrieve the dropped element's stored Event Object
              var originalEventObject = eventObj.data('eventObject');
              var $categoryClass = eventObj.attr('data-class');
              // we need to copy it, so that multiple events don't have a reference to the same object
              var copiedEventObject = $.extend({}, originalEventObject);
              // assign it the date that was reported
              copiedEventObject.start = date;
              if ($categoryClass)
                  copiedEventObject['className'] = [$categoryClass];
              // render the event on the calendar
              $this.$calendar.fullCalendar('renderEvent', copiedEventObject, true);
              // is the "remove after drop" checkbox checked?
              if ($('#drop-remove').is(':checked')) {
                  // if so, remove the element from the "Draggable Events" list
                  eventObj.remove();
              }
      },
      /* on click on event */
      CalendarApp.prototype.onEventClick =  function (calEvent, jsEvent, view) {
          var $this = this;
              var form = $("<form></form>");
              form.append("<label>Change event name</label>");
              form.append("<div class='input-group'><input class='form-control' type=text value='" + calEvent.title + "' /><span class='input-group-btn'><button type='submit' class='btn btn-success waves-effect waves-light'><i class='fa fa-check'></i> Save</button></span></div>");
              $this.$modal.modal({
                  backdrop: 'static'
              });
              $this.$modal.find('.delete-event').show().end().find('.save-event').hide().end().find('.modal-body').empty().prepend(form).end().find('.delete-event').unbind('click').click(function () {
                  $this.$calendarObj.fullCalendar('removeEvents', function (ev) {
                      return (ev._id == calEvent._id);
                  });
                  $this.$modal.modal('hide');
              });
              $this.$modal.find('form').on('submit', function () {
                  calEvent.title = form.find("input[type=text]").val();
                  $this.$calendarObj.fullCalendar('updateEvent', calEvent);
                  $this.$modal.modal('hide');
                  return false;
              });
      },
      /* on select */
      CalendarApp.prototype.onSelect = function (start, end, allDay) {
          var $this = this;
              $this.$modal.modal({
                  backdrop: 'static'
              });
              var form = $("<form></form>");
              form.append("<div class='row'></div>");
              form.find(".row")
                  .append("<div class='col-md-6'><div class='form-group'><label class='control-label'>Event Name</label><input class='form-control' placeholder='Insert Event Name' type='text' name='title'/></div></div>")
                  .append("<div class='col-md-6'><div class='form-group'><label class='control-label'>Category</label><select class='form-control' name='category'></select></div></div>")
                  .find("select[name='category']")
                  .append("<option value='bg-danger'>Danger</option>")
                  .append("<option value='bg-success'>Success</option>")
                  .append("<option value='bg-purple'>Purple</option>")
                  .append("<option value='bg-primary'>Primary</option>")
                  .append("<option value='bg-pink'>Pink</option>")
                  .append("<option value='bg-info'>Info</option>")
                  .append("<option value='bg-warning'>Warning</option></div></div>");
              $this.$modal.find('.delete-event').hide().end().find('.save-event').show().end().find('.modal-body').empty().prepend(form).end().find('.save-event').unbind('click').click(function () {
                  form.submit();
              });
              $this.$modal.find('form').on('submit', function () {
                  var title = form.find("input[name='title']").val();
                  var beginning = form.find("input[name='beginning']").val();
                  var ending = form.find("input[name='ending']").val();
                  var categoryClass = form.find("select[name='category'] option:checked").val();
                  if (title !== null && title.length != 0) {
                      $this.$calendarObj.fullCalendar('renderEvent', {
                          title: title,
                          start:start,
                          end: end,
                          allDay: false,
                          className: categoryClass
                      }, true);
                      $this.$modal.modal('hide');
                  }
                  else{
                      alert('You have to give a title to your event');
                  }
                  return false;

              });
              $this.$calendarObj.fullCalendar('unselect');
      },
      CalendarApp.prototype.enableDrag = function() {
          //init events
          $(this.$event).each(function () {
              // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
              // it doesn't need to have a start or end
              var eventObject = {
                  title: $.trim($(this).text()) // use the element's text as the event title
              };
              // store the Event Object in the DOM element so we can get to it later
              $(this).data('eventObject', eventObject);
              // make the event draggable using jQuery UI
              $(this).draggable({
                  zIndex: 999,
                  revert: true,      // will cause the event to go back to its
                  revertDuration: 0  //  original position after the drag
              });
          });
      }
      /* Initializing */
      CalendarApp.prototype.init = function() {

          this.enableDrag();
          /*  Initialize the calendar  */
          var date = new Date();
          var d = date.getDate();
          var m = date.getMonth();
          var y = date.getFullYear();
          var form = '';
          var today = new Date($.now());

          var defaultEvents =  [{
                  title: 'Released Ample Admin!',
                  start: new Date($.now() + 506800000),
                  className: 'bg-info'
              }, {
                  title: 'This is today check date',
                  start: today,
                  end: today,
                  className: 'bg-danger'
              }, {
                  title: 'This is your birthday',
                  start: new Date($.now() + 848000000),
                  className: 'bg-info'
              },{
                  title: 'your meeting with john',
                  start: new Date($.now() - 1099000000),
                  end:  new Date($.now() - 919000000),
                  className: 'bg-warning'
              },{
                  title: 'your meeting with john',
                  start: new Date($.now() - 1199000000),
                  end: new Date($.now() - 1199000000),
                  className: 'bg-purple'
              },{
                  title: 'your meeting with john',
                  start: new Date($.now() - 399000000),
                  end: new Date($.now() - 219000000),
                  className: 'bg-info'
              },
                {
                  title: 'Hanns birthday',
                  start: new Date($.now() + 868000000),
                  className: 'bg-danger'
              },{
                  title: 'Like it?',
                  start: new Date($.now() + 348000000),
                  className: 'bg-success'
              }];

          var $this = this;
          $this.$calendarObj = $this.$calendar.fullCalendar({
              slotDuration: '00:15:00', /* If we want to split day time each 15minutes */
              minTime: '08:00:00',
              maxTime: '19:00:00',
              defaultView: 'month',
              handleWindowResize: true,

              header: {
                  left: 'prev,next today',
                  center: 'title',
                  right: 'month,agendaWeek,agendaDay'
              },
              events: defaultEvents,
              editable: true,
              droppable: true, // this allows things to be dropped onto the calendar !!!
              eventLimit: true, // allow "more" link when too many events
              selectable: true,
              drop: function(date) { $this.onDrop($(this), date); },
              select: function (start, end, allDay) { $this.onSelect(start, end, allDay); },
              eventClick: function(calEvent, jsEvent, view) { $this.onEventClick(calEvent, jsEvent, view); }

          });

          //on new event
          this.$saveCategoryBtn.on('click', function(){
              var categoryName = $this.$categoryForm.find("input[name='category-name']").val();
              var categoryColor = $this.$categoryForm.find("select[name='category-color']").val();
              if (categoryName !== null && categoryName.length != 0) {
                  $this.$extEvents.append('<div class="calendar-events bg-' + categoryColor + '" data-class="bg-' + categoryColor + '" style="position: relative;"><i class="fa fa-move"></i>' + categoryName + '</div>')
                  $this.enableDrag();
              }

          });
      },

     //init CalendarApp
      $.CalendarApp = new CalendarApp, $.CalendarApp.Constructor = CalendarApp;
      $.CalendarApp.init();

  }


}
