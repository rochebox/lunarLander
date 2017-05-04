	//New added May2 for in Middle Checks
	public void doInMiddleCheck( int groupSize ){
			
			for(int row = 0; row < boardWidthSquares; ++row){
				for(int col = 0; col < boardWidthSquares; ++col){
					if(theGameBoard[row][col].getState() == PenteMain.EMPTY){
						checkForBlockInMiddle(row, col, groupSize);
					}
				}
			}
	}