<?php
function my_potentially_slow_function() {
    error_log("qm-debug");
}

// Start the 'foo' timer:
do_action( 'qm/start', 'foo' );

// Run some code
my_potentially_slow_function();

// Stop the 'foo' timer:
do_action( 'qm/stop', 'foo' );


do_action( 'qm/debug', 'This happened!' );

do_action( 'qm/debug', 'This happened2!' );

define( 'QM_ENABLE_CAPS_PANEL', true );