package vendingmachine;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DisplayName("Testing vending machine")
class VendingMachineTest {
    private VendingMachine vendingMachine;

    @BeforeEach
    void setUp() {
        vendingMachine = new VendingMachine();
    }

    @Nested
    @DisplayName("Configure vending machine")
    class deliversCanOfChoiceTest {
        @Test
        @DisplayName("Check if unconfigured machine delivers nothing")
        void testUnconfiguredMachineDeliversNothing() {
            assertEquals(Can.NOTHING, vendingMachine.delivers(Choice.COLA));
        }

        @Test
        void testChoosingColaDeliversCoke() {
            vendingMachine.configures(Choice.COLA, Can.COKE, 0);
            assertEquals(Can.COKE, vendingMachine.delivers(Choice.COLA));
        }

        @Test
        void testConfiguringMultipleCansShouldDeliverCorrectCan(){
            vendingMachine.configures(Choice.COLA, Can.COKE, 0);
            vendingMachine.configures(Choice.FIZZY_ORANGE, Can.FANTA, 0);

            assertEquals(Can.FANTA, vendingMachine.delivers(Choice.FIZZY_ORANGE));
            assertEquals(Can.COKE, vendingMachine.delivers(Choice.COLA));
        }
    }

    @Nested
    class CostMoneyTest {

        @BeforeEach
        void setUp(){
            vendingMachine.configures(Choice.COLA, Can.COKE, 1.00);
        }

        @Test
        void testSetColaPrice(){
            assertEquals(Can.NOTHING, vendingMachine.delivers(Choice.COLA));
            vendingMachine.addCredits(1.00);
            assertEquals(Can.COKE, vendingMachine.delivers(Choice.COLA));
        }

        @Test
        void testAddCreditsInSteps(){
            vendingMachine.addCredits(0.5);
            vendingMachine.addCredits(0.5);
            assertEquals(Can.COKE, vendingMachine.delivers(Choice.COLA));
        }

        @Test
        void testSetFantaToDifferentPrice(){
            vendingMachine.configures(Choice.FIZZY_ORANGE, Can.FANTA, 2.00);

            vendingMachine.addCredits(1.00);
            assertEquals(Can.COKE, vendingMachine.delivers(Choice.COLA));
            assertEquals(Can.NOTHING, vendingMachine.delivers(Choice.FIZZY_ORANGE));

            vendingMachine.addCredits(2.00);
            assertEquals(Can.FANTA, vendingMachine.delivers(Choice.FIZZY_ORANGE));
        }

        @Test
        void testAdjustCreditsWhenBuyingACan() {
            vendingMachine.addCredits(2.00);
            vendingMachine.delivers(Choice.COLA);
            assertEquals(Can.COKE, vendingMachine.delivers(Choice.COLA));
            assertEquals(Can.NOTHING, vendingMachine.delivers(Choice.COLA));
        }
    }
}