class Main {
	static main() {
	  let window = document.getElementById("canvas");
		//window.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		//window.setResizable(false);
		//window.setTitle("WallGame");

		g_gamePanel = new GamePanel(window);
		//window.add(gamePanel);
		//window.pack();

		//window.setLocationRelativeTo(null);
		//window.setVisible(true);

		g_gamePanel.startGameThread();

		/*
		window.addComponentListener(new ComponentAdapter() {
			public void componentResized(ComponentEvent evt) {
	            Component c = (Component)evt.getSource();
	            gamePanel.getWindowSizes(c.getWidth(),c.getHeight());
	        }
		});
		*/
	}
}
