package vendingmachine;

import java.util.HashMap;
import java.util.Map;

enum Can {
    COKE, FANTA, NOTHING
}

enum Choice {
    FIZZY_ORANGE, COLA
}

class Drawer {
    public Can can;
    public double price;

    public Drawer(Can can, double price) {
        this.can = can;
        this.price = price;
    }

    public Can deliver(Cashier cashier) {
        double price = this.price;
        if (cashier.hasSufficientCredits(price)) {return Can.NOTHING;}
        cashier.subtractPrice(price);
        return this.can;
    }
}

class Cashier {
    public double credits = 0;

    public boolean hasSufficientCredits(double price) {
        return credits < price;
    }

    public void addCredits(double credits) {
        this.credits += credits;
    }

    public void subtractPrice(double price) {
        credits -= price;
    }
}

public class VendingMachine {
    private Map<Choice, Drawer> inventory = new HashMap<>();
    private Cashier cashier = new Cashier();

    public Can delivers(Choice choice) {
        if (!inventory.containsKey(choice)) {return Can.NOTHING;}
        return inventory.get(choice).deliver(cashier);
    }

    public void addCredits(double credits) {
        cashier.addCredits(credits);
    }

    public void configures(Choice choice, Can can, double price) {
        inventory.put(choice, new Drawer(can, price));
    }


}