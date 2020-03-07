    // Hetan Navadia
	// IT-202 Project-3

    // Declared variables
	let context, square, control, loop;
	let benefitObject = {x:500, y:0, radius:10};
    let harmObject = {x:500, y:0, radius:10};
    let harmObject2 = {x:500, y:0, radius:10};
	
	// Declared default values
	life = 5;
	score = -1; // Set to -1 because it adds when the game starts so 0
    score2 = 5;
    level = 1;
    speed = 2;

	c = document.querySelector("canvas");
	context = c.getContext("2d");
	c.height = 400;
	c.width = 1000;

    // Game starts when user presses space
    document.addEventListener('keyup', event => {
        if (event.code === 'Space') 
	    {
            window.requestAnimationFrame(loop);
	    }
	})

    let backgroundImage = new Image();
    let startScreen = new Image();

	backgroundImage.src = "https://i.redd.it/w92uuxemv5p21.png";
    startScreen.src = "https://upload.wikimedia.org/wikipedia/commons/5/50/Black_colour.jpg";
	startScreen.onload = () => 
	{
		context.drawImage(startScreen, 0, 0, 1000, 400);
        
        // Start Screen
        context.fillStyle = "blue";
        context.font = "bold 35px Arial";
        context.textAlign = "center";
        context.fillText("Welcome to Fall!", c.width/2, c.height/3);
        context.font = "25px Arial";
        context.fillText("Left Arrow Key: Moves Left", c.width/2, c.height/1.90);
        context.fillText("Right Arrow Key: Moves Right", c.width/2, c.height/1.70);
        context.fillText("You'll Get 3 Lives", c.width/2, c.height/1.52);
        context.fillText("Catch White Balls to Increase Score", c.width/2, c.height/1.39);
        context.fillText("You Will Lose Life: Touch Red or White Ball Touches Floor", c.width/2, c.height/1.28);
        context.fillText("Press SPACE to Start!", c.width/2, c.height/1.1);
	}

	// Square (Moves Left to Right)
	square = {
		height:20,
		width:20,
		x:500,
		x_velocity:0,
		y:0,
		y_velocity:0
	};

	// Control for the moves
	control = {
		left:false,
		right:false,
        
		keyListener:function(event) 
		{
			let key_state = (event.type == "keydown")?true:false;

			switch(event.keyCode) 
			{
				case 37:// left key
					control.left = key_state;
				break;
				case 39:// right key
					control.right = key_state;
				break;
			}
		}
	};
	 
    // Collision of objects
	collision = (obj1, obj2) => 
	{
		let result = false;
		
		let dx = obj1.x - obj2.x;
		let dy = obj1.y - obj2.y;
		let distance = Math.sqrt((dx * dx) + (dy * dy));

		if (distance <= ((obj1.height/2) + (obj2.radius)))
		{
			result = true;
			console.log("COLLIDE");
		}
        
		console.log(result);
		return result;
	}

	// Loop to
	loop = () => 
	{
		// Clear screen
		context.clearRect(0,0, c.width, c.height);		
		
		// Speed
		benefitObject["y"] += speed;  
        harmObject["y"] += speed;
        harmObject2["y"] += speed;
        
        // Movement in each direction
		if (control.left) {
			square.x_velocity -= 0.5;
		}

		if (control.right) {
			square.x_velocity += 0.5;
		}
        
        // Movement speed
		square.y_velocity += 1.5;
        square.x_velocity *= 0.9;
		square.x += square.x_velocity;
		square.y += square.y_velocity;

		if (benefitObject["y"] > c.height + benefitObject["radius"])
        {
			benefitObject["x"] = Math.floor(Math.random() * c.width);
			benefitObject["y"] = -benefitObject["radius"];
		}	
        if (harmObject["y"] > c.height + harmObject["radius"])
        {
			harmObject["x"] = Math.floor(Math.random() * c.width);
			harmObject["y"] = -harmObject["radius"];
		}	
        if (harmObject2["y"] > c.height + harmObject2["radius"])
        {
			harmObject2["x"] = Math.floor(Math.random() * c.width);
			harmObject2["y"] = -harmObject2["radius"];
		}
        
        // Catching box at the bottom
		if (square.y > 350) 
		{
			square.y = 350;
		}

		// Stay inside left and right screen
		if (square.x < -50)
        {
			square.x = 1000;
		} 
		// If it goes past right boundary
		else if (square.x > 1000)
        {
			square.x = -50;
		}
	
		// Gaming Screen Display
		context.drawImage(backgroundImage, 0, 0, backgroundImage.naturalWidth * 0.5, backgroundImage.naturalHeight * 0.5);

		context.beginPath();
		context.arc(benefitObject["x"], benefitObject["y"], benefitObject["radius"], 0, Math.PI*2);
		context.closePath();
		context.fillStyle = "white";
		context.fill();
        
        // Circle Harm 1
        context.beginPath();
		context.arc(harmObject["x"], harmObject["y"], harmObject["radius"], 0, Math.PI*2);
		context.closePath();
		context.fillStyle = "red";
		context.fill();
        
        // Circle Harm 2
        context.beginPath();
		context.arc(harmObject2["x"], harmObject2["y"], harmObject2["radius"], 0, Math.PI*2);
		context.closePath();
		context.fillStyle = "red";
		context.fill();
        
        // Square
		context.fillStyle = "white";
		context.beginPath();
		context.rect(square.x, square.y, square.width, square.height);
		context.fill();

        // If it collides increase score, levels and speed
		if (collision(square, benefitObject))
		{
			score++; 
            if (score2 == score)
            {
                score2 = score2 + 5;
                speed = speed + 0.5;
                level++;
            }
            
			benefitObject["x"] = Math.floor(Math.random() * c.width);
			benefitObject["y"] = -benefitObject["radius"];
		}
        // If it collides with first circle
        else if (collision(square, harmObject))
        {
            life--; 
			harmObject["x"] = Math.floor(Math.random() * c.width);
			harmObject["y"] = -harmObject["radius"];
        }
        // If it collides with second circle
        else if (collision(square, harmObject2))
        {
            life--; 
			harmObject2["x"] = Math.floor(Math.random() * c.width);
			harmObject2["y"] = -harmObject2["radius"];
        }
        // If it touches the floor
		else if (benefitObject["y"] == -benefitObject["radius"])
		{
			life--; 
			benefitObject["x"] = Math.floor(Math.random() * c.width);
			benefitObject["y"] = -benefitObject["radius"];
		}
		
		// Gaming screen text display
        context.font = 'bold 30px Arial';
        context.fillStyle = "yellow";
        context.fillText('Lives: ' + life, 60, 25);
        context.fillText('Score: ' + score, 60, 55);
        context.fillText('Level: ' + level, 60, 85);
		
		// End screen
        if (life < 0)
        {
            context.fillStyle = "#000000";
            context.beginPath();
            context.rect(0, 0, 1000, 400);
            context.fill();
            
            context.font = "bold 35px Arial";
			context.fillStyle = "blue";
			context.textAlign = "center";
			context.fillText("GAME OVER", c.width/2, c.height/3);
            context.font = "25px Arial";
            context.fillText("Your Score: " + score, c.width/2, c.height/1.8);
            context.fillText("Level Reached: " + level, c.width/2, c.height/1.5);
        }
        else
        {
            window.requestAnimationFrame(loop);	   
        }
	};

	window.addEventListener("keydown", control.keyListener);
	window.addEventListener("keyup", control.keyListener);