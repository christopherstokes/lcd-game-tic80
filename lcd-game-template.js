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

function NewFrame(_sp, _x, _y, _w, _h, _scl, _act_cb, _flp, _rot, _ck) {
	var _frame = {}
	_frame.sp=_sp
	_frame.x=_x
	_frame.y=_y
	_frame.w=_w || 8
	_frame.h=_h || 8
	_frame.flp=_flp || false
	_frame.act_cb = _act_cb || function(){return;} // callback action
	_frame.scl=_scl || 1
	_frame.ck=_ck || 0

	return _frame
}

// Frame Sequence Definitions
player_frames = [
	NewFrame(1,32,105,8,16,2),
	NewFrame(1,52,105,8,16,2),
	NewFrame(1,74,105,8,16,2),
	NewFrame(1,106,105,8,16,2)
]

drop1_frames = [
	NewFrame(33,20,0),
	NewFrame(34,20,32),
	NewFrame(35,20,64),
	NewFrame(36,20,96),
	NewFrame(37,20,128)
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
var drop1=SequenceRecycle(drop1_frames, 1000)

function TIC()
{
	cls()
	
	UpdateSequences()

	PlayerUpdate()
	
	DrawSequences()
}

// <TILES>
// 001:000000000000000000aaaa0000444400004444000caaaac0c000000cc004400c
// 017:c00cc00c06666660006666000066660000888800080000800800008044000044
// 033:00080000000800000088800008f8880008888800008880000000000000000000
// 034:0000000000080000008880000888880008f88800008880000008000000000000
// 035:0000000000080000008880000088800008f88800088888000088800000000000
// 036:0000000000080000000800000088800000888000008f8000088f880000888000
// 037:00f00000000000000000080008000000000000000008000008888880888ff888
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

