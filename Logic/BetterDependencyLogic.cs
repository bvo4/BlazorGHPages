namespace BlazorApp1.Logic;

public class BetterDependencyLogic : IDependencyLogic
{
    public int Value1 { get; private set; }
     public int Value2 { get; private set; }

    public BetterDependencyLogic()
    {
        Value1 = 3;
        Value2 = 4;
     }
}
