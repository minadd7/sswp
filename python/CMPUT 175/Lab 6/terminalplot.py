'''
Base code from here : https://github.com/kressi/terminalplot/blob/master/terminalplot/terminalplot.py
'''

# import fcntl
import os
# import termios
import struct


def plot_multiple(x, y1, y2, rows = None, columns = None):
	"""
	The  first y1 will be '*' and the second will be '#'
	x, y list of values on x- and y-axis
	plot those values within canvas size (rows and columns)
	"""
	
	if not rows or not columns:
		rows, columns = get_terminal_size()
	
	# these might not be required
	arows = rows + 2
	acols = columns + 4
	
	# offset for caption
	rows -= 4
	
	# Scale points such that they fit on canvas
	x_scaled = xscale(x, columns)
	y1_scaled, y2_scaled = yscale(y1, y2, rows)
	print(x_scaled)
	print(y1_scaled)
	print(y2_scaled)
	
	# Create empty canvas
	canvas = [[' ' for _ in range(columns)] for _ in range(rows)]
	
	# We can trry to print the axes
	# canvas[columns-1][0] = '0'
	# for i in range(columns-4,0):
	#     canvas[1][i] = '_'
	# for i in range(1, rows):
	#     canvas[i][4] = '|'
	
	# Add scaled points to canvas for first plot
	for ix, iy in zip(x_scaled, y1_scaled):
		canvas[rows - iy - 1][ix] = '*'
	
	# print for the second plot
	for ix, iy in zip(x_scaled, y2_scaled):
		if canvas[rows - iy - 1][ix] == '*':
			canvas[rows - iy - 1][ix] = '#'
		else:
			canvas[rows - iy - 1][ix] = '+'
	
	# testing
	# canvas[0][0] = '0'
	# canvas[0][columns - 1] = '1'
	# canvas[rows - 1][0] = '2'
	# canvas[rows - 1][columns - 1] = '3'
	
	# we can replace the common point with  another type of label
	# Print rows of canvas
	for row in [''.join(row) for row in canvas]:
		print(row)
	
	# Print scale
	print(''.join([
		'\nMin x: ', str(min(x)),
		' Max x: ', str(max(x)),
		# ' Min y: ',  str(min(y)),
		# ' Max y: ',  str(max(y))
		' Min y: ', str(min(min(y1), min(y2))),
		' Max y: ', str(max(max(y1), max(y2)))
	]))


def plot_multiple2(x, y1, y2, rows = None, columns = None):
	"""
	Trying to print the axis as well
	The  first y1 will be '*' and the second will be '#'
	x, y list of values on x- and y-axis
	plot those values within canvas size (rows and columns)
	"""
	
	if not rows or not columns:
		rows, columns = get_terminal_size()
	
	# offset for caption
	rows -= 4
	# these might not be required
	arows = rows + 2
	acols = columns + 4
	
	# Scale points such that they fit on canvas
	x_scaled = xscale(x, columns - 4)
	y1_scaled, y2_scaled = yscale(y1, y2, rows)
	# print(x_scaled)
	# print(y1_scaled)
	# print(y2_scaled)
	
	# Create empty canvas
	canvas = [[' ' for _ in range(columns)] for _ in range(arows)]
	
	# We can trry to print the axes
	# canvas[columns-1][0] = '0'
	# for i in range(columns-4,0):
	#     canvas[1][i] = '_'
	# for i in range(1, rows):
	#     canvas[i][4] = '|'
	
	# Add scaled points to canvas for first plot
	
	for ix, iy in zip(x_scaled, y1_scaled):
		canvas[rows - iy - 1][ix + 4] = '*'
	
	# i = 0
	# for ix, iy in zip(x_scaled, y1_scaled):
	#     if ix <2:
	#         i = i+1
	#         continue
	#     canvas[arows - 1][ix:ix+4] = str(x1[i])[:4]
	#     i = i + 1
	
	# print for the second plot
	for ix, iy in zip(x_scaled, y2_scaled):
		if canvas[rows - iy - 1][ix + 4] == '*':
			canvas[rows - iy - 1][ix + 4] = '#'
		else:
			canvas[rows - iy - 1][ix + 4] = '+'
	# canvas[arows-1] [0] = '0'
	for i in range(columns):
		canvas[arows - 2][i] = '_'
	canvas[arows - 1][0] = '0'
	for i in range(arows):
		canvas[i][2] = '|'
	# testing
	# canvas[0][0] = '0'
	# canvas[0][acols - 1] = '1'
	# canvas[arows - 1][0] = '2'
	# canvas[arows - 1][acols - 1] = '3'
	
	# we can replace the common point with  another type of label
	# Print rows of canvas
	for row in [''.join(row) for row in canvas]:
		print(row)
	
	# Print scale
	print(''.join([
		'\nMin x: ', str(min(x)),
		' Max x: ', str(max(x)),
		# ' Min y: ',  str(min(y)),
		# ' Max y: ',  str(max(y))
		' Min y: ', str(min(min(y1), min(y2))),
		' Max y: ', str(max(max(y1), max(y2)))
	]))


def plot(x, y, rows = None, columns = None):
	"""
	x, y list of values on x- and y-axis
	plot those values within canvas size (rows and columns)
	"""
	if not rows or not columns:
		rows, columns = get_terminal_size()
	# offset for caption
	rows -= 4
	
	# Scale points such that they fit on canvas
	x_scaled = scale(x, columns)
	y_scaled = scale(y, rows)
	
	# Create empty canvas
	canvas = [[' ' for _ in range(columns)] for _ in range(rows)]
	
	# Add scaled points to canvas
	for ix, iy in zip(x_scaled, y_scaled):
		canvas[rows - iy - 1][ix] = '*'
	
	# Print rows of canvas
	for row in [''.join(row) for row in canvas]:
		print(row)
	
	# Print scale
	print(''.join([
		'\nMin x: ', str(min(x)),
		' Max x: ', str(max(x)),
		' Min y: ', str(min(y)),
		' Max y: ', str(max(y))
	]))


def plot2(x, y1, y2, rows = None, columns = None):
	"""
	x, y list of values on x- and y-axis
	plot those values within canvas size (rows and columns)
	"""
	'''
	if not rows or not columns:
		rows, columns = get_terminal_size()
	'''
	# offset for caption
	rows -= 4
	
	# Scale points such that they fit on canvas
	x_scaled = scale(x, columns)
	y1_scaled, y2_scaled = yscale(y1, y2, rows)
	
	# Create empty canvas
	canvas = [[' ' for _ in range(columns)] for _ in range(rows)]
	
	# Add scaled points to canvas
	for ix, iy in zip(x_scaled, y1_scaled):
		canvas[rows - iy - 1][ix] = '*'
	for ix, iy in zip(x_scaled, y2_scaled):
		if canvas[rows - iy - 1][ix] == '*':
			canvas[rows - iy - 1][ix] = '+'
		else:
			canvas[rows - iy - 1][ix] = '#'
	
	# Print rows of canvas
	for row in [''.join(row) for row in canvas]:
		print(row)
	
	# Print scale
	print(''.join([
		'\nMin x: ', str(min(x)),
		' Max x: ', str(max(x)),
		# ' Min y: ',  str(min(y)),
		# ' Max y: ',  str(max(y))
		' Min y: ', str(min(min(y1), min(y2))),
		' Max y: ', str(max(max(y1), max(y2)))
	]))


def scale(x, length):
	"""
	Scale points in 'x', such that distance between
	max(x) and min(x) equals to 'length'. min(x)
	will be moved to 0.
	"""
	s = float(length - 1) / \
	    (max(x) - min(x)) if x and max(x) - min(x) != 0 else length
	return [int((i - min(x)) * s) for i in x]


def xscale(x, length):
	"""
	Scale points in 'x', such that distance between
	max(x) and min(x) equals to 'length'. min(x)
	will be moved to 0.
	"""
	s = float(length - 1) / \
	    (max(x) - min(x)) if x and max(x) - min(x) != 0 else length
	return [int((i - min(x)) * s) for i in x]


def get_terminal_size():
	try:
		with open(os.ctermid(), 'r') as fd:
			rc = struct.unpack(
				'hh', fcntl.ioctl(fd, termios.TIOCGWINSZ, '1234'))
	except:
		rc = (os.getenv('LINES', 25), os.getenv('COLUMNS', 80))
	
	return rc


def yscale(y1, y2, length):
	"""
	Scale points in 'y', such that distance between
	max(x) and min(x) equals to 'length'. min(y)
	will be moved to 0.
	"""
	max_ = max(max(y1), max(y2))
	min_ = min(min(y1), min(y2))
	s = float(length - 1) / \
	    (max_ - min_) if (y1 or y2) and max_ - min_ != 0 else length
	return [int((i - min_) * s) for i in y1], [int((i - min_) * s) for i in y2]


def get_terminal_size():
	try:
		with open(os.ctermid(), 'r') as fd:
			rc = struct.unpack(
				'hh', fcntl.ioctl(fd, termios.TIOCGWINSZ, '1234'))
	except:
		rc = (os.getenv('LINES', 25), os.getenv('COLUMNS', 80))
	
	return rc


if __name__ == '__main__':
	plot_multiple2(x, y1, y2)  # , rows = 80, columns=80)
