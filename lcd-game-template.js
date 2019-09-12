// title:  LCD Game Template
// author: game developer
// desc:   short description
// script: js

// global vars
var sequences = []


// library functions
function SequenceNew(_s, _frames, _timing) {
	var s = _s || {}
	s.frames = _frames || []
	s.current_frame = 0
	s.timing = _timing
	s.last_time = time()
	s.on = true
	return s
}

function SequenceRecycle(_frames, _timing) {
	for(var i=0; i<sequences.length; i++) {
		_s = sequences[i]
		if(_s.on == false) {
			var s = SequenceNew(_s, _frames, _timing)
			return s
		}
	}
	var s = SequenceNew(false, _frames, _timing)
	sequences[sequences.length]=s
	return s	
}

function UpdateSequences() {
	for(var i=0; i<sequences.length; i++) {
		var _s = sequences[i]
		if(_s.on) {
			if(_s.timing) {
				if(time() - _s.last_time > _s.timing) {
					_s.last_time = time()
					_s.current_frame += 1
					if(_s.current_frame == _s.frames.length) {_s.current_frame=0}
				}
			}
			_s.frames[_s.current_frame].act_cb()
		}
	}
}

function DrawSequences() {
	for(var i=0; i<sequences.length; i++) {
		var _s=sequences[i]
		if(_s.on) {
			var frame = _s.frames[_s.current_frame]
			spr(frame.sp, frame.x, frame.y, frame.ck, frame.scl, frame.flp, frame.rot, frame.w/8, frame.h/8)
		}
	}
}

function NewFrame(_sp, _x, _y, _w, _h, _act_cb, _scl, _flp, _rot, _ck) {
	var _frame = {}
	_frame.sp=_sp
	_frame.x=_x
	_frame.y=_y
	_frame.w=_w || 8
	_frame.h=_h || 8
	_frame.flp=_flp || false
	_frame.act_cb = _act_cb || function(){return;} // callback action
	_frame.scl=_scl || 1
	_frame.ck=_ck || -1

	return _frame
}

// Frame Sequence Definitions
player_frames = [
	NewFrame(1,20,105,16,16),
	NewFrame(1,52,105,16,16),
	NewFrame(1,74,105,16,16),
	NewFrame(1,106,105,16,16)
]

// player update
function PlayerUpdate() {
	if(btnp(3)) {
		if(player.current_frame < player.frames.length-1) {
			player.current_frame+=1
		}
	}
	if(btnp(2)) {
		if(player.current_frame > 0) {
			player.current_frame-=1
		}
	}
}

// init

for(var i=0; i<20; i++) {
	var _s = SequenceNew(false,false,false)
	_s.on = false
	sequences[sequences.length]=_s
}

var player=SequenceRecycle(player_frames, false);

function TIC()
{
	cls()
	
	UpdateSequences()

	PlayerUpdate()
	
	DrawSequences()
}

// <TILES>
// 001:efffffffff222222f8888888f8222222f8fffffff8ff0ffff8ff0ffff8ff0fff
// 002:fffffeee2222ffee88880fee22280feefff80fff0ff80f0f0ff80f0f0ff80f0f
// 003:efffffffff222222f8888888f8222222f8fffffff8fffffff8ff0ffff8ff0fff
// 004:fffffeee2222ffee88880fee22280feefff80ffffff80f0f0ff80f0f0ff80f0f
// 017:f8fffffff8888888f888f888f8888ffff8888888f2222222ff000fffefffffef
// 018:fff800ff88880ffef8880fee88880fee88880fee2222ffee000ffeeeffffeeee
// 019:f8fffffff8888888f888f888f8888ffff8888888f2222222ff000fffefffffef
// 020:fff800ff88880ffef8880fee88880fee88880fee2222ffee000ffeeeffffeeee
// </TILES>

// <WAVES>
// 000:00000000ffffffff00000000ffffffff
// 001:0123456789abcdeffedcba9876543210
// 002:0123456789abcdef0123456789abcdef
// </WAVES>

// <SFX>
// 000:000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000304000000000
// </SFX>

// <PALETTE>
// 000:140c1c44243430346d4e4a4e854c30346524d04648757161597dced27d2c8595a16daa2cd2aa996dc2cadad45edeeed6
// </PALETTE>

